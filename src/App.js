// src/App.js
import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { nanoid } from 'nanoid';
// import './App.css'; 
import SingleCard from './components/singlecard/SingleCard';
import Celebration from './components/celebration/Celebration';
import ToggleTheme from './components/toggleTheme/toggleTheme';
import ShowConfetti from './components/confetti/Confetti';
import GameOver from './components/gameover/GameOver';
import CustomCursor from './components/CustomCursor/CustomCursor';

import { cardImages } from './data/cardImages';
import { numbers } from './constants/numbers';
import { secureShuffleArray, pickRandomImages } from './utils/logic';
import useTrackViewCounter from './hooks/useTrackViewCounter';

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [matched, setMatched] = useState(0);
  const [celebrationStatus, setCelebrationStatus] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(undefined);
  const intervalRef = useRef(null);
  const hintTimeoutRef = useRef(null);
  const hintIntervalRef = useRef(null);
  const hintLockedRef = useRef(false);
  const [hintCount, setHintCount] = useState(3);
  const [hintCooldown, setHintCooldown] = useState(0);
  const [hintActive, setHintActive] = useState(false);
  const [animateCollapse, setAnimateCollapse] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState(false);
  const viewCounter = useTrackViewCounter();
  const REVEAL_DURATION = 2000;
  const HINT_COOLDOWN = 5000;

  const soundEffect = useMemo(() => {
    const audio = new Audio();
    audio.autoplay = true;
    return audio;
  }, []);

  const playSound = useCallback(
    src => {
      soundEffect.src = src;
      soundEffect.load();
      soundEffect.play().catch(() => { });
    },
    [soundEffect]
  );

  const resetTurn = useCallback(() => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prev => prev + 1);
    setDisabled(false);
  }, []);

  const handleTime = useCallback(start => {
    if (start) {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setElapsedTime(prev => (prev || 0) + 1);
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

  const hintCards = useCallback(() => {
    if (hintActive || hintLockedRef.current) return;

    if (!cards || cards.length === 0) return;
    if (hintCount === 0) return;

    setHintCount(c => c - 1);
    hintLockedRef.current = true;
    if (elapsedTime === undefined) handleTime(true);
    const seconds = Math.floor(HINT_COOLDOWN / 1000);
    setHintCooldown(seconds);
    if (hintIntervalRef.current) clearInterval(hintIntervalRef.current);
    hintIntervalRef.current = setInterval(() => {
      setHintCooldown(s => {
        if (s <= 1) {
          clearInterval(hintIntervalRef.current);
          hintIntervalRef.current = null;
          hintLockedRef.current = false;
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    const available = cards
      .map((c, i) => ({ c, i }))
      .filter(({ c }) => !c.matched);
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

    const idxA =
      crypto.getRandomValues(new Uint32Array(1))[0] % available.length;

    let idxB =
      crypto.getRandomValues(new Uint32Array(1))[0] % (available.length - 1);
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
  }, [cards, hintCount, hintActive]);

  const shuffledCards = useCallback(() => {
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
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(dup);
    setTurns(0);
    setMatched(0);
    setCelebrationStatus(false);
    setElapsedTime(undefined);
    clearTimer();
    setAnimateCollapse(true);
    setTimeout(() => setAnimateCollapse(false), 1200);
    setGameOverMessage(false);
  }, [clearTimer]);

  const handleNewGame = useCallback(() => {
    setHintCount(3);
    setHintCooldown(0);
    playSound('audio/start.mp3');
    shuffledCards();
  }, [playSound, shuffledCards]);

  const handleChoice = useCallback(
    card => {
      if (disabled) return;
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
      if (elapsedTime === undefined) handleTime(true);
    },
    [choiceOne, disabled, elapsedTime, handleTime]
  );

  useEffect(() => {
    if (hintActive) return;

    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        playSound('/audio/match.wav');
        setCards(prev =>
          prev.map(c => (c.src === choiceOne.src ? { ...c, matched: true } : c))
        );
        setMatched(prev => prev + 2);
        resetTurn();
      } else {
        playSound('/audio/fail.wav');
        const t = setTimeout(() => resetTurn(), 1000);
        return () => clearTimeout(t);
      }
    } else if (choiceOne) {
      playSound('/audio/swap.wav');
    }
  }, [choiceOne, choiceTwo, resetTurn, playSound]);

  useEffect(() => {
    if (matched === cards.length && turns) {
      handleTime(false);
      const storedHigh = globalThis.localStorage.getItem('highscore');
      const storedRun = globalThis.localStorage.getItem('runtime');
      const better =
        storedHigh === null ||
        turns < Number(storedHigh) ||
        (turns === Number(storedHigh) && elapsedTime < Number(storedRun));

      if (better) {
        globalThis.localStorage.setItem('highscore', turns);
        globalThis.localStorage.setItem('runtime', elapsedTime);
        playSound('audio/celebration.mp3');
        setCelebrationStatus(true);
        setHighScore(turns);
        setGameOverMessage(false);
      } else {
        setGameOverMessage(true);
      }
    }
  }, [matched, cards.length, turns, elapsedTime, handleTime, playSound]);

  useEffect(() => {
    shuffledCards();
    const hs = Number(globalThis.localStorage.getItem('highscore') || 0);
    setHighScore(hs);
    return () => {
      clearTimer();
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
    };
  }, [shuffledCards, clearTimer]);

  return (
    <div className='max-w-[860px] mx-auto py-10'>
      <CustomCursor />
      {celebrationStatus && (
        <Celebration
          highScore={highScore}
          elapsedTime={elapsedTime}
          handleRestartGame={handleNewGame}
        />
      )}
      {celebrationStatus && <ShowConfetti />}
      <img src='/img/logo.png' alt='A&A Match' style={{ height: '60px' }} />
      <br />
      <div className='flex mt-2.5 flex-row items-center justify-center max-[600px]:flex-col max-[600px]:gap-5'>
        <button
          className='text-text bg-background border-2 border-current px-3 py-1.5 rounded font-bold text-base hover:bg-[green] hover:text-white'
          onClick={handleNewGame}
        >
          New Game
        </button>
        <div className='flex items-center justify-around'>
          <button
            className='mx-2.5 text-text bg-background border-2 border-current px-3 py-1.5 rounded font-bold text-base hover:bg-yellow-300 hover:text-black'
            onClick={hintCards}
            disabled={hintCooldown > 0 || hintCount <= 0 || hintActive}
          >
            {hintCooldown > 0 ? `Hint (ready in ${hintCooldown}s)` : 'Hint'}
          </button>
          <p className='text-[15px] text-text'>
            {hintCount === 1 ? 'Hint Remaining: ' : 'Hints Remaining: '}
            {hintCount}
          </p>
        </div>
      </div>
      <ToggleTheme />
      <div
        className={`mt-10 grid grid-cols-4 gap-5 max-[800px]:grid-cols-3 max-[800px]:mx-[5px] max-[800px]:gap-[10px] max-[600px]:grid-cols-2 max-[600px]:gap-[5px] max-[390px]:grid-cols-1 max-[390px]:content-center ${animateCollapse ? 'animate-collapse' : ''}`}
      >
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
      <div className='flex justify-center gap-4'>
        <p>HighScore: {highScore}</p>
        <p>Runtime: {globalThis.localStorage.getItem('runtime') || 0}</p>
      </div>
      <p>Time Elapsed: {elapsedTime || 'Not started'}</p>
      {viewCounter !== null && <p>This memory got {viewCounter} views</p>}
      {gameOverMessage && (
        <GameOver
          score={turns}
          elapsedTime={elapsedTime}
          handleRestartGame={handleNewGame}
        />
      )}
    </div>
  );
}

export default App;
