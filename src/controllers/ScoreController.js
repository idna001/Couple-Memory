// src/controllers/ScoreController.js
import { useState, useCallback, useEffect } from "react";

export const useScoreController = () => {
  const [highScore, setHighScore] = useState(0);
  const [celebrationStatus, setCelebrationStatus] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState(false);

  const loadHighScore = useCallback(() => {
    const hs = Number(globalThis.localStorage.getItem("highscore") || 0);
    setHighScore(hs);
  }, []);

  const checkGameCompletion = useCallback((matched, cardsLength, turns, elapsedTime, onCelebration) => {
    if (matched === cardsLength && turns) {
      const storedHigh = globalThis.localStorage.getItem("highscore");
      const storedRun = globalThis.localStorage.getItem("runtime");
      const better =
        storedHigh === null ||
        turns < Number(storedHigh) ||
        (turns === Number(storedHigh) && elapsedTime < Number(storedRun));

      if (better) {
        globalThis.localStorage.setItem("highscore", turns);
        globalThis.localStorage.setItem("runtime", elapsedTime);
        setCelebrationStatus(true);
        setHighScore(turns);
        setGameOverMessage(false);
        if (onCelebration) onCelebration();
      } else {
        setGameOverMessage(true);
      }
    }
  }, []);

  const resetGameState = useCallback(() => {
    setCelebrationStatus(false);
    setGameOverMessage(false);
  }, []);

  // Load high score on mount
  useEffect(() => {
    loadHighScore();
  }, [loadHighScore]);

  return {
    highScore,
    celebrationStatus,
    gameOverMessage,
    checkGameCompletion,
    resetGameState,
    loadHighScore,
  };
};
