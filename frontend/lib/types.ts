export type Niche = 'fashion' | 'beauty' | 'lifestyle' | 'food' | 'home';

export interface Creator {
  id: string;
  name: string;
  username: string;
  profile_pic: string;
  follower_count: number;
  bio: string;
  niche: Niche;
  onboarding_complete: boolean;
  creator_type_ids?: string[];
  category?: string;
}

export interface AgeDistribution {
  '13-17': number;
  '18-24': number;
  '25-34': number;
  '35-44': number;
  '45+': number;
}

export interface GenderSplit {
  female: number;
  male: number;
  other: number;
}

export interface AudienceProfile {
  age_distribution: AgeDistribution;
  gender: GenderSplit;
  top_locations: string[];
  income_bracket: string;
  interests: string[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price_range: string;
  commission_pct: number;
  niche_tags: Niche[];
  image_url: string;
  match_score: number;
  description: string;
}

export type BotStep =
  | 'idle'
  | 'welcome'
  | 'ask_age_group'
  | 'ask_price_range'
  | 'show_products'
  | 'transition'
  | 'error';

export type PriceRange = 'budget' | 'mid' | 'premium';
export type AgeGroup = '13-17' | '18-24' | '25-34';

export interface BuyerInsights {
  language: string;
  narration_style: string;
  video_style: string;
  gender: { female: number; male: number; coverage_pct: number };
  age_groups: Array<{ label: string; value: number }>;
  primary_buyer_tip: string;
  tier_distribution: { metro: number; tier2: number; tier3: number };
  top_cities: string[];
  city_count: number;
  tier_tip: string;
  order_frequency: { repeat: number; first_time: number };
}

export interface OnboardingAnswers {
  ageGroup: AgeGroup | null;
  priceRange: PriceRange | null;
}
