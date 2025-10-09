// src/controllers/TimerController.js
import { useState, useCallback, useRef } from "react";

export const useTimerController = () => {
  const [elapsedTime, setElapsedTime] = useState(undefined);
  const intervalRef = useRef(null);

  const handleTime = useCallback((start) => {
    if (start) {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setElapsedTime((prev) => (prev || 0) + 1);
        }, 1000);
      }
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    clearTimer();
    setElapsedTime(undefined);
  }, [clearTimer]);

  return {
    elapsedTime,
    handleTime,
    clearTimer,
    resetTimer,
  };
};
