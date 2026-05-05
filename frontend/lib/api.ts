import { Creator, AudienceProfile, Product, AgeGroup, PriceRange } from './types';
import { MOCK_CREATOR, MOCK_AUDIENCE, MOCK_PRODUCTS } from './mock-creator';

const IS_MOCK = process.env.NEXT_PUBLIC_MOCK_AUTH === 'true';

/**
 * Returns the API base URL that works in every context:
 *
 * - Local dev:  NEXT_PUBLIC_API_URL=http://localhost:8000  → absolute URL, both SSR + client
 * - Vercel prod: NEXT_PUBLIC_API_URL=/_/backend
 *     Client-side → relative URL works (same domain)
 *     SSR (server component) → relative URLs are invalid in Node.js fetch,
 *       so we prepend the deployment URL that Vercel sets via VERCEL_URL
 */
function getApiBase(): string {
  const configured = process.env.NEXT_PUBLIC_API_URL;

  // Absolute URL (starts with http/https) → works everywhere
  if (configured && /^https?:\/\//.test(configured)) return configured;

  // Client side → relative URL is fine on the same domain
  if (typeof window !== 'undefined') return configured ?? '/_/backend';

  // Server side (SSR / Server Components) → must be absolute
  // VERCEL_URL is injected automatically by Vercel, without the protocol
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}${configured ?? '/_/backend'}`;
  }

  // Local dev SSR fallback
  return 'http://localhost:8000';
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${getApiBase()}${path}`, {
    credentials: 'include',
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
  return res.json();
}

export async function getCreator(): Promise<Creator> {
  if (IS_MOCK) return MOCK_CREATOR;
  return apiFetch<Creator>('/api/creator/me');
}

export async function getAudience(): Promise<AudienceProfile> {
  if (IS_MOCK) return MOCK_AUDIENCE;
  return apiFetch<AudienceProfile>('/api/creator/audience');
}

export async function getRecommendedProducts(
  niche: string,
  priceRange: PriceRange,
  ageGroup: AgeGroup
): Promise<Product[]> {
  if (IS_MOCK) {
    const rangeMap: Record<PriceRange, [number, number]> = {
      budget: [0, 500],
      mid: [500, 1500],
      premium: [1500, Infinity],
    };
    const [min, max] = rangeMap[priceRange];
    return MOCK_PRODUCTS.filter((p) => {
      const price = parseInt(p.price_range.replace(/[^0-9]/g, '').slice(0, 4));
      return price >= min && price <= max;
    }).slice(0, 8);
  }
  return apiFetch<Product[]>(
    `/api/products/recommended?niche=${niche}&price_range=${priceRange}&age_group=${ageGroup}`
  );
}

export async function getOnboardingStatus(): Promise<{ complete: boolean }> {
  if (IS_MOCK) return { complete: false };
  return apiFetch<{ complete: boolean }>('/api/onboarding/status');
}

export async function saveOnboardingProfile(data: {
  name: string;
  username: string;
  follower_count: number;
  category: string;
  creator_type_id: string;
}): Promise<void> {
  if (IS_MOCK) return;
  await apiFetch<{ ok: boolean }>('/api/onboarding/profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function getTTSAudio(text: string): Promise<Blob> {
  const res = await fetch(`${getApiBase()}/api/voice/tts`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error('TTS request failed');
  return res.blob();
}

export function getInstagramAuthUrl(): string {
  if (IS_MOCK) return '/for-you';
  // Always client-side (user click) — relative URL works fine
  const base = process.env.NEXT_PUBLIC_API_URL ?? '/_/backend';
  return `${base}/auth/instagram`;
}
