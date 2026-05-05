'use client';

import { useReducer, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { VoiceBotAvatar } from './VoiceBotAvatar';
import { VoiceBotBubble } from './VoiceBotBubble';
import { useAudioPlayer } from './useAudioPlayer';
import { ONBOARDING_SCRIPT, getStepScript, getNextStep } from '@/lib/onboarding-script';
import { getRecommendedProducts } from '@/lib/api';
import { BotStep, OnboardingAnswers, Product, AgeGroup, PriceRange } from '@/lib/types';

type Action =
  | { type: 'START' }
  | { type: 'AUDIO_ENDED' }
  | { type: 'USER_ANSWERED'; payload: string }
  | { type: 'PRODUCTS_LOADED'; payload: Product[] }
  | { type: 'ERROR'; payload: string };

interface BotState {
  step: BotStep;
  isPlaying: boolean;
  awaitingInput: boolean;
  currentText: string;
  answers: OnboardingAnswers;
  products: Product[];
  started: boolean;
  error: string | null;
}

const INITIAL_STATE: BotState = {
  step: 'idle',
  isPlaying: false,
  awaitingInput: false,
  currentText: '',
  answers: { ageGroup: null, priceRange: null },
  products: [],
  started: false,
  error: null,
};

function reducer(state: BotState, action: Action): BotState {
  switch (action.type) {
    case 'START':
      return { ...state, step: 'welcome', started: true };
    case 'AUDIO_ENDED': {
      const script = getStepScript(state.step);
      if (!script) return state;
      if (script.inputType === 'none') {
        // auto-advance handled by effect
        return { ...state, isPlaying: false };
      }
      return { ...state, isPlaying: false, awaitingInput: true };
    }
    case 'USER_ANSWERED': {
      const nextStep = getNextStep(state.step);
      const answers = { ...state.answers };
      if (state.step === 'ask_age_group') {
        const map: Record<string, AgeGroup> = {
          'Teens (13–17)': '13-17',
          'Young Adults (18–24)': '18-24',
          'Professionals (25–34)': '25-34',
        };
        answers.ageGroup = map[action.payload] ?? '18-24';
      }
      if (state.step === 'ask_price_range') {
        const map: Record<string, PriceRange> = {
          'Budget (< ₹500)': 'budget',
          'Mid-range (₹500–₹1500)': 'mid',
          'Premium (> ₹1500)': 'premium',
        };
        answers.priceRange = map[action.payload] ?? 'mid';
      }
      return {
        ...state,
        awaitingInput: false,
        answers,
        step: nextStep ?? state.step,
      };
    }
    case 'PRODUCTS_LOADED':
      return { ...state, products: action.payload };
    case 'ERROR':
      return { ...state, error: action.payload, isPlaying: false };
    default:
      return state;
  }
}

interface VoiceBotWidgetProps {
  niche?: string;
  creatorName?: string;
  mode?: 'greeting' | 'onboarding';
}

export function VoiceBotWidget({
  niche = 'fashion',
  creatorName = 'there',
  mode = 'onboarding',
}: VoiceBotWidgetProps) {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const hasAutoAdvanced = useRef(false);

  const onAudioEnded = useCallback(() => {
    dispatch({ type: 'AUDIO_ENDED' });
  }, []);

  const { play, isPlaying } = useAudioPlayer(onAudioEnded);

  // Build text for current step and play TTS
  const playCurrentStep = useCallback(
    async (step: BotStep, products: Product[]) => {
      const script = getStepScript(step);
      if (!script) return;
      const text = script.getText({ niche, products });
      await play(text);
    },
    [niche, play]
  );

  // Fetch products when we reach show_products
  useEffect(() => {
    if (state.step === 'show_products' && state.products.length === 0) {
      getRecommendedProducts(
        niche,
        state.answers.priceRange ?? 'mid',
        state.answers.ageGroup ?? '18-24'
      ).then((products) => {
        dispatch({ type: 'PRODUCTS_LOADED', payload: products });
      });
    }
  }, [state.step, state.products.length, niche, state.answers]);

  // Play TTS whenever step advances (and products are ready if needed)
  useEffect(() => {
    if (!state.started || state.step === 'idle') return;
    if (state.step === 'show_products' && state.products.length === 0) return; // wait for products
    hasAutoAdvanced.current = false;
    playCurrentStep(state.step, state.products);
  }, [state.step, state.started, state.products, playCurrentStep]);

  // Auto-advance on 'transition' step after audio ends
  useEffect(() => {
    if (state.step === 'transition' && !isPlaying && state.started && !hasAutoAdvanced.current) {
      hasAutoAdvanced.current = true;
      setTimeout(() => router.push('/for-you'), 800);
    }
  }, [state.step, isPlaying, state.started, router]);

  const currentScript = getStepScript(state.step);
  const currentText =
    state.step !== 'idle'
      ? currentScript?.getText({ niche, products: state.products }) ?? ''
      : mode === 'greeting'
      ? `Hi! I'm Ritu, your Style Bazaar guide. I'll help you find the perfect products to sell based on your content. Click below to get started!`
      : '';

  if (mode === 'greeting' && !state.started) {
    return (
      <div className="flex flex-col items-center gap-6 p-8">
        <VoiceBotAvatar isPlaying={false} size="lg" />
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Meet Ritu</h2>
          <p className="text-sm text-gray-500">Your personal Style Bazaar guide</p>
        </div>
        <VoiceBotBubble text={currentText} isPlaying={false} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      {/* Avatar + bubble */}
      <div className="flex items-start gap-4">
        <VoiceBotAvatar isPlaying={isPlaying} size="md" />
        {state.step !== 'idle' && currentText && (
          <VoiceBotBubble text={currentText} isPlaying={isPlaying} />
        )}
      </div>

      {/* Choices or continue button */}
      {state.awaitingInput && currentScript?.inputType === 'choice' && (
        <div className="grid grid-cols-1 gap-3 w-full">
          {currentScript.choices?.map((choice) => (
            <button
              key={choice}
              onClick={() => dispatch({ type: 'USER_ANSWERED', payload: choice })}
              className="w-full py-3 px-5 rounded-xl border-2 border-pink-200 bg-white hover:bg-pink-50 hover:border-pink-400 text-gray-700 font-medium text-sm transition-all duration-200 text-left"
            >
              {choice}
            </button>
          ))}
        </div>
      )}

      {state.awaitingInput && currentScript?.inputType === 'continue' && (
        <button
          onClick={() => dispatch({ type: 'USER_ANSWERED', payload: 'continue' })}
          className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200"
        >
          Continue →
        </button>
      )}

      {!state.started && (
        <button
          onClick={() => dispatch({ type: 'START' })}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
        >
          🎙️ Start with Ritu
        </button>
      )}

      {state.error && (
        <p className="text-xs text-red-500 text-center">{state.error}</p>
      )}
    </div>
  );
}
