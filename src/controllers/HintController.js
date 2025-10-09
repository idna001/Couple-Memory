// src/controllers/HintController.js
import { useState, useCallback, useRef } from "react";

export const useHintController = () => {
  const [hintCount, setHintCount] = useState(3);
  const [hintCooldown, setHintCooldown] = useState(0);
  const [hintActive, setHintActive] = useState(false);
  
  const hintTimeoutRef = useRef(null);
  const hintIntervalRef = useRef(null);
  const hintLockedRef = useRef(false);
  
  const REVEAL_DURATION = 2000;
  const HINT_COOLDOWN = 5000;

  const hintCards = useCallback((cards, turns, elapsedTime, setChoiceOne, setChoiceTwo, setDisabled, setTurns, handleTime) => {
    if (hintActive || hintLockedRef.current) return;

    if (!cards || cards.length === 0) return;
    if (hintCount === 0) return;

    setHintCount((c) => c - 1);
    hintLockedRef.current = true;
    if (elapsedTime === undefined) handleTime(true);
    
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

    const available = cards.map((c, i) => ({ c, i })).filter(({ c }) => !c.matched);
    if (available.length === 0) {
      if (hintIntervalRef.current) {
        clearInterval(hintIntervalRef.current);
        hintIntervalRef.current = null;
      }
      setHintCooldown(0);
      hintLockedRef.current = false;
      return;
    }

    if (available.length === 1) {
      setHintActive(true);
      setDisabled(true);
      setChoiceOne(available[0].c);
      setChoiceTwo(null);

      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
      hintTimeoutRef.current = setTimeout(() => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setHintActive(false);
        setDisabled(false);
      }, REVEAL_DURATION);

      return;
    }

    const idxA = crypto.getRandomValues(new Uint32Array(1))[0] % available.length;

    let idxB = crypto.getRandomValues(new Uint32Array(1))[0] % (available.length - 1);
    if (idxB >= idxA) idxB += 1;

    const cardA = available[idxA].c;
    const cardB = available[idxB].c;

    setHintActive(true);
    setDisabled(true);
    setChoiceOne(cardA);
    setChoiceTwo(cardB);
    setTurns(turns + 1);

    if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
    hintTimeoutRef.current = setTimeout(() => {
      setChoiceOne(null);
      setChoiceTwo(null);
      setHintActive(false);
      setDisabled(false);
    }, REVEAL_DURATION);
  }, [hintActive, hintCount]);

  const resetHints = useCallback(() => {
    setHintCount(3);
    setHintCooldown(0);
    setHintActive(false);
  }, []);

  const cleanupHints = useCallback(() => {
    if (hintTimeoutRef.current) {
      clearTimeout(hintTimeoutRef.current);
      hintTimeoutRef.current = null;
    }
    if (hintIntervalRef.current) {
      clearInterval(hintIntervalRef.current);
      hintIntervalRef.current = null;
    }
    hintLockedRef.current = false;
    setHintCooldown(0);
  }, []);

  return {
    hintCount,
    hintCooldown,
    hintActive,
    hintCards,
    resetHints,
    cleanupHints,
  };
};
