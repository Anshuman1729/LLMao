'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { GhostMascot } from '@/components/Onboarding/GhostMascot';
import { ProgressBar } from '@/components/Onboarding/ProgressBar';
import { CategoryPicker } from '@/components/Onboarding/CategoryPicker';
import { CreatorTypePicker } from '@/components/Onboarding/CreatorTypePicker';
import { MicButton } from '@/components/Onboarding/MicButton';
import { useAudioPlayer } from '@/components/VoiceBot/useAudioPlayer';
import { CATEGORIES } from '@/components/Onboarding/CategoryPicker';

type Step = 'greeting_1' | 'greeting_2' | 'category' | 'creator_type';

const STEP_TEXT: Record<Step, string> = {
  greeting_1: "I'll help you through your journey..",
  greeting_2: "Let's set-up your profile first",
  category: 'Which category do you create content on?',
  creator_type: 'Whom do you resonate with the most?',
};

const STEP_TITLES: Partial<Record<Step, string>> = {
  category: 'Choose your category',
  creator_type: 'Choose your type',
};

const STEP_SUBTITLES: Partial<Record<Step, string>> = {
  category: 'Which category do you create content on?',
  creator_type: 'Whom do you resonate with the most?',
};

// Steps that show the progress bar (0-indexed)
const PICKER_STEPS: Step[] = ['category', 'creator_type'];

const FLOW: Step[] = ['greeting_1', 'greeting_2', 'category', 'creator_type'];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('greeting_1');
  const [tapped, setTapped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCreatorType, setSelectedCreatorType] = useState<string | null>(null);

  const progressIndex = PICKER_STEPS.indexOf(step);
  const isGreeting = step === 'greeting_1' || step === 'greeting_2';
  const isPicker = PICKER_STEPS.includes(step);

  const advance = useCallback(() => {
    setStep((current) => {
      const idx = FLOW.indexOf(current);
      return (FLOW[idx + 1] as Step) ?? current;
    });
  }, []);

  const onAudioEnded = useCallback(() => {
    // Audio playback finished — user must tap to continue
  }, []);

  const { play } = useAudioPlayer(onAudioEnded);

  // Play TTS whenever step changes (after user taps to begin)
  useEffect(() => {
    if (!tapped) return;
    play(STEP_TEXT[step]);
  }, [step, tapped]); // eslint-disable-line react-hooks/exhaustive-deps

  // Voice input: match spoken word to a category
  const handleVoiceCategory = useCallback((transcript: string) => {
    const match = CATEGORIES.find(
      (c) => transcript.includes(c.id) || transcript.includes(c.label.toLowerCase())
    );
    if (match) setSelectedCategory(match.id);
  }, []);

  // ── Greeting screens ──────────────────────────────────────────
  if (isGreeting) {
    return (
      <main
        className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 cursor-pointer select-none"
        onClick={() => {
          if (!tapped) {
            setTapped(true);
            play(STEP_TEXT[step]);
          } else {
            advance();
          }
        }}
      >
        <GhostMascot size="lg" />

        {/* Speech bubble */}
        <div className="mt-6 bg-white rounded-2xl rounded-tl-none px-6 py-4 shadow-md border border-gray-100 max-w-xs text-center">
          <p className="text-gray-700 text-sm font-medium leading-relaxed">{STEP_TEXT[step]}</p>
        </div>

        {!tapped && (
          <p className="mt-8 text-xs text-gray-400">Tap anywhere to begin</p>
        )}
        {tapped && (
          <p className="mt-8 text-xs text-gray-400">Tap to continue</p>
        )}
      </main>
    );
  }

  // ── Picker screens (category / creator type / instagram) ──────
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar: progress + close */}
      <div className="flex items-center gap-3 px-4 pt-5 pb-3">
        <div className="flex-1">
          <ProgressBar current={progressIndex} total={2} />
        </div>
        <button
          onClick={() => router.push('/')}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-gray-100 text-sm font-medium"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* Ghost + speech bubble */}
      <div className="flex flex-col items-center pt-4 pb-2">
        <GhostMascot size="md" />
        <div className="mt-3 bg-white rounded-xl rounded-tl-none px-4 py-2.5 shadow-sm border border-gray-100 max-w-xs">
          <p className="text-gray-600 text-xs leading-relaxed">{STEP_TEXT[step]}</p>
        </div>
      </div>

      {/* Step title */}
      <div className="px-5 pt-5 pb-3">
        <h2 className="text-2xl font-extrabold text-gray-900">{STEP_TITLES[step]}</h2>
        <p className="text-sm text-gray-400 mt-1">{STEP_SUBTITLES[step]}</p>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto px-5 pb-28">
        {step === 'category' && (
          <CategoryPicker
            selected={selectedCategory}
            onSelect={(id) => {
              setSelectedCategory(id);
              setTimeout(advance, 300);
            }}
          />
        )}

        {step === 'creator_type' && (
          <CreatorTypePicker
            selected={selectedCreatorType}
            onSelect={(id) => {
              setSelectedCreatorType(id);
            }}
          />
        )}

      </div>

      {/* Bottom action bar */}
      {isPicker && (
        <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-8 pt-4 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent">
          {step === 'category' && (
            <MicButton onResult={handleVoiceCategory} />
          )}
          {step === 'creator_type' && selectedCreatorType && (
            <button
              onClick={() => router.push('/for-you')}
              className="px-10 py-3.5 rounded-2xl bg-pink-600 text-white font-bold shadow-lg shadow-pink-200 hover:bg-pink-700 transition-colors"
            >
              Continue →
            </button>
          )}
        </div>
      )}
    </main>
  );
}
