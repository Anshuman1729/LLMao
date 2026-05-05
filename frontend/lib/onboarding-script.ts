import { BotStep, Product } from './types';

export interface BotScriptStep {
  id: BotStep;
  getText: (ctx: { niche?: string; products?: Product[] }) => string;
  inputType: 'none' | 'choice' | 'continue';
  choices?: string[];
}

export const ONBOARDING_SCRIPT: BotScriptStep[] = [
  {
    id: 'welcome',
    getText: ({ niche = 'fashion' }) =>
      `Hi! I'm Ritu, your Style Bazaar guide. I can see you create content around ${niche}. That's a fantastic niche on Meesho! I'll help you find products your audience will love. Ready to get started?`,
    inputType: 'continue',
  },
  {
    id: 'ask_age_group',
    getText: () =>
      `Great! Who are most of your followers? Are they teens between 13 and 17, young adults between 18 and 24, or working professionals between 25 and 34?`,
    inputType: 'choice',
    choices: ['Teens (13–17)', 'Young Adults (18–24)', 'Professionals (25–34)'],
  },
  {
    id: 'ask_price_range',
    getText: () =>
      `Perfect! What price range works best for your followers? Budget friendly under 500 rupees, mid-range between 500 and 1500, or premium above 1500?`,
    inputType: 'choice',
    choices: ['Budget (< ₹500)', 'Mid-range (₹500–₹1500)', 'Premium (> ₹1500)'],
  },
  {
    id: 'show_products',
    getText: ({ products = [] }) => {
      const names = products
        .slice(0, 5)
        .map((p) => p.name)
        .join(', ');
      return `Excellent taste! Based on your profile, I recommend these top picks for you: ${names}. These products have commissions up to 25 percent and perfectly match your audience. Let's see your personalized dashboard!`;
    },
    inputType: 'continue',
  },
  {
    id: 'transition',
    getText: () =>
      `Your personalised Style Bazaar dashboard is ready. You'll see exactly who your audience is and the best products to promote. Let's go!`,
    inputType: 'none',
  },
];

export function getStepScript(stepId: BotStep): BotScriptStep | undefined {
  return ONBOARDING_SCRIPT.find((s) => s.id === stepId);
}

export const STEP_ORDER: BotStep[] = [
  'welcome',
  'ask_age_group',
  'ask_price_range',
  'show_products',
  'transition',
];

export function getNextStep(current: BotStep): BotStep | null {
  const idx = STEP_ORDER.indexOf(current);
  if (idx === -1 || idx === STEP_ORDER.length - 1) return null;
  return STEP_ORDER[idx + 1];
}
