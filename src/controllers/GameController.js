// src/controllers/GameController.js
import { useState, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { cardImages } from '../data/cardImages';
import { numbers } from '../constants/numbers';
import { secureShuffleArray, pickRandomImages } from '../utils/logic';

export const useGameController = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [matched, setMatched] = useState(0);
  const [animateCollapse, setAnimateCollapse] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const resetTurn = useCallback(() => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prev => prev + 1);
    setDisabled(false);
  }, []);

  const initializeGame = useCallback(() => {
    const selected = pickRandomImages(cardImages, 6);
    const dup = [...selected, ...selected]
      .sort(() => nanoid(16).localeCompare(nanoid(16)))
      .map(card => {
        const crypto = globalThis.crypto || globalThis.msCrypto;
        const rand = new Uint32Array(1);
        crypto.getRandomValues(rand);
        return { ...card, id: rand[0], matched: false };
      });

    secureShuffleArray(numbers);
    resetGameState();
    setCards(dup);
    setAnimateCollapse(true);
    setTimeout(() => setAnimateCollapse(false), 1200);
  }, []);

  const resetGameState = useCallback(() => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setMatched(0);
    setDisabled(false);
    setGameStarted(false);
  }, []);

  const handleChoice = useCallback(
    card => {
      if (disabled) return;

      if (!gameStarted) {
        setGameStarted(true);
      }

      if (choiceOne) {
        setChoiceTwo(card);
      } else {
        setChoiceOne(card);
      }
    },
    [choiceOne, disabled, gameStarted]
  );

  const updateMatchedCards = useCallback(src => {
    setCards(prev =>
      prev.map(c => (c.src === src ? { ...c, matched: true } : c))
    );
    setMatched(prev => prev + 2);
  }, []);

  return {
    // State
    cards,
    turns,
    choiceOne,
    choiceTwo,
    disabled,
    matched,
    animateCollapse,
    gameStarted,
    // Actions
    setDisabled,
    setChoiceOne,
    setChoiceTwo,
    setTurns,
    resetTurn,
    initializeGame,
    resetGameState,
    handleChoice,
    updateMatchedCards,
  };
};
