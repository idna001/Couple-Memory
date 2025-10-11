// src/utils/useHint.js
import { useState, useRef, useCallback } from "react";

export function useHint({
  cards,
  handleTime,
  setChoiceOne,
  setChoiceTwo,
  setTurns,
  setDisabled,
}) {
  const [hintCount, setHintCount] = useState(3);
  const [hintCooldown, setHintCooldown] = useState(0);
  const [hintActive, setHintActive] = useState(false);

  const hintTimeoutRef = useRef(null);
  const hintIntervalRef = useRef(null);
  const hintLockedRef = useRef(false);

  const REVEAL_DURATION = 2000;
  const HINT_COOLDOWN = 5000;

  const hintCards = useCallback(() => {
    if (hintActive || hintLockedRef.current) return;
    if (!cards || cards.length === 0) return;
    if (hintCount === 0) return;

    setHintCount((c) => c - 1);
    hintLockedRef.current = true;

    handleTime(true);

    const seconds = Math.floor(HINT_COOLDOWN / 1000);
    setHintCooldown(seconds);
    if (hintIntervalRef.current) clearInterval(hintIntervalRef.current);
    hintIntervalRef.current = setInterval(() => {
      setHintCooldown((s) => {
        if (s <= 1) {
          clearInterval(hintIntervalRef.current);
          hintIntervalRef.current = null;
          hintLockedRef.current = false;
          return 0;
        }
        return s - 1;
      });
    }, 1000);

      const unmatchedSrcs = [...new Set(cards.filter(c => !c.matched).map(c => c.src))];
    if (unmatchedSrcs.length === 0) {
      clearInterval(hintIntervalRef.current);
      hintLockedRef.current = false;
      setHintCooldown(0);
      return;
    }

    const available = cards.filter(c => !c.matched);
    if (available.length === 0) {
      clearInterval(hintIntervalRef.current);
      hintLockedRef.current = false;
      setHintCooldown(0);
      return;
    }

       const randomSrc = unmatchedSrcs[Math.floor(Math.random() * unmatchedSrcs.length)];
    const pair = cards.filter(c => c.src === randomSrc && !c.matched);

    setHintActive(true);
    setDisabled(true);
    setChoiceOne(pair[0]);
    setChoiceTwo(pair[1]);
    setTurns((t) => t + 1);

    if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
    hintTimeoutRef.current = setTimeout(() => {
      setChoiceOne(null);
      setChoiceTwo(null);
      setHintActive(false);
      setDisabled(false);
    }, REVEAL_DURATION);
  }, [cards, hintCount, hintActive, handleTime, setChoiceOne, setChoiceTwo, setTurns, setDisabled]);

  const resetHints = useCallback(() => {
    setHintCount(3);
    setHintCooldown(0);
    hintLockedRef.current = false;
    if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
    if (hintIntervalRef.current) clearInterval(hintIntervalRef.current);
  }, []);

  return {
    hintCount,
    hintCooldown,
    hintActive,
    hintCards,
    resetHints,
  };
}
