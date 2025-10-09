// src/controllers/AudioController.js
import { useMemo, useCallback } from "react";

export const useAudioController = () => {
  const soundEffect = useMemo(() => {
    const audio = new Audio();
    audio.autoplay = true;
    return audio;
  }, []);

  const playSound = useCallback(
    (src) => {
      soundEffect.src = src;
      soundEffect.load();
      soundEffect.play().catch(() => {});
    },
    [soundEffect]
  );

  const playSounds = {
    match: () => playSound("/audio/match.wav"),
    fail: () => playSound("/audio/fail.wav"),
    swap: () => playSound("/audio/swap.wav"),
    celebration: () => playSound("audio/celebration.mp3"),
    start: () => playSound("audio/start.mp3"),
  };

  return {
    playSound,
    playSounds,
  };
};
