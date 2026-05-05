'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { GhostMascot } from '@/components/Onboarding/GhostMascot';
import { ProgressBar } from '@/components/Onboarding/ProgressBar';
import { CategoryPicker } from '@/components/Onboarding/CategoryPicker';
import { CreatorTypePicker } from '@/components/Onboarding/CreatorTypePicker';
import { MicButton } from '@/components/Onboarding/MicButton';
import { useAudioPlayer } from '@/components/VoiceBot/useAudioPlayer';
import { saveOnboardingProfile } from '@/lib/api';
import { CATEGORIES } from '@/components/Onboarding/CategoryPicker';

type Step = 'greeting_1' | 'greeting_2' | 'category' | 'creator_type' | 'user_info';

const STEP_TEXT: Record<Step, string> = {
  greeting_1: "I'll help you through your journey..",
  greeting_2: "Let's set-up your profile first",
  category: 'Which category do you create content on?',
  creator_type: 'Who do you look up to as a creator?',
  user_info: 'Almost there! Tell us a little about yourself.',
};

const STEP_TITLES: Partial<Record<Step, string>> = {
  category: 'Choose your category',
  creator_type: 'Your inspiration',
  user_info: 'Your profile',
};

const STEP_SUBTITLES: Partial<Record<Step, string>> = {
  category: 'Which category do you create content on?',
  creator_type: 'Pick the creator whose style you aspire to.',
  user_info: 'This is how you\'ll appear on your dashboard.',
};

const PICKER_STEPS: Step[] = ['category', 'creator_type', 'user_info'];

const FLOW: Step[] = ['greeting_1', 'greeting_2', 'category', 'creator_type', 'user_info'];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('greeting_1');
  const [tapped, setTapped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCreatorType, setSelectedCreatorType] = useState<string | null>(null);

  // user_info step state
  const [userName, setUserName] = useState('');
  const [userHandle, setUserHandle] = useState('');
  const [userFollowers, setUserFollowers] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

  const handleFinish = useCallback(async () => {
    if (!userName.trim() || !selectedCategory || !selectedCreatorType) return;
    setSubmitting(true);
    try {
      await saveOnboardingProfile({
        name: userName.trim(),
        username: userHandle.trim().replace(/^@/, ''),
        follower_count: parseInt(userFollowers) || 0,
        category: selectedCategory,
        creator_type_id: selectedCreatorType,
      });
    } catch {
      // Non-fatal — navigate anyway
    } finally {
      setSubmitting(false);
      router.push('/for-you');
    }
  }, [userName, userHandle, userFollowers, selectedCategory, selectedCreatorType, router]);

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

  // ── Picker screens ────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar: progress + close */}
      <div className="flex items-center gap-3 px-4 pt-5 pb-3">
        <div className="flex-1">
          <ProgressBar current={progressIndex} total={3} />
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

        {step === 'user_info' && (
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Your name</label>
              <input
                type="text"
                placeholder="e.g. Priya Sharma"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-pink-400 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Instagram handle</label>
              <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-3 focus-within:border-pink-400 transition-colors">
                <span className="text-gray-400 text-sm mr-1">@</span>
                <input
                  type="text"
                  placeholder="yourhandle"
                  value={userHandle}
                  onChange={(e) => setUserHandle(e.target.value.replace(/^@/, ''))}
                  className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Followers</label>
              <input
                type="number"
                placeholder="e.g. 12000"
                value={userFollowers}
                onChange={(e) => setUserFollowers(e.target.value)}
                min={0}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-pink-400 transition-colors"
              />
            </div>
          </div>
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
              onClick={advance}
              className="px-10 py-3.5 rounded-2xl bg-pink-600 text-white font-bold shadow-lg shadow-pink-200 hover:bg-pink-700 transition-colors"
            >
              Continue →
            </button>
          )}
          {step === 'user_info' && (
            <button
              onClick={handleFinish}
              disabled={!userName.trim() || submitting}
              className="px-10 py-3.5 rounded-2xl bg-pink-600 text-white font-bold shadow-lg shadow-pink-200 hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Setting up...' : 'Get Started →'}
            </button>
          )}
        </div>
      )}
    </main>
  );
}
