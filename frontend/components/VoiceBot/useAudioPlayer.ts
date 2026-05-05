'use client';

import { useState, useRef, useCallback } from 'react';
import { getTTSAudio } from '@/lib/api';

interface UseAudioPlayerResult {
  play: (text: string) => Promise<void>;
  stop: () => void;
  isPlaying: boolean;
  error: string | null;
}

export function useAudioPlayer(onEnded?: () => void): UseAudioPlayerResult {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  const stop = useCallback(() => {
    sourceRef.current?.stop();
    sourceRef.current = null;
    setIsPlaying(false);
  }, []);

  const play = useCallback(
    async (text: string) => {
      try {
        setError(null);

        // Lazily create AudioContext on first user gesture
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContext();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          await ctx.resume();
        }

        stop();

        const blob = await getTTSAudio(text);
        const arrayBuffer = await blob.arrayBuffer();
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        sourceRef.current = source;

        source.onended = () => {
          setIsPlaying(false);
          sourceRef.current = null;
          onEnded?.();
        };

        setIsPlaying(true);
        source.start(0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Audio playback failed');
        setIsPlaying(false);
        // Still fire onEnded so state machine doesn't get stuck
        onEnded?.();
      }
    },
    [stop, onEnded]
  );

  return { play, stop, isPlaying, error };
}
