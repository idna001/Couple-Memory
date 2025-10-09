// src/App.js
import { useEffect, useCallback } from 'react';
import './App.css';
import SingleCard from './components/singlecard/SingleCard';
import Celebration from './components/celebration/Celebration';
import ToggleTheme from './components/toggleTheme/toggleTheme';
import ShowConfetti from './components/confetti/Confetti';
import GameOver from './components/gameover/GameOver';
import CustomCursor from './components/CustomCursor/CustomCursor';

// Import controllers
import {
  useGameController,
  useTimerController,
  useAudioController,
  useScoreController,
  useHintController,
} from './controllers';
import useTrackViewCounter from './hooks/useTrackViewCounter';

function App() {
  // Initialize controllers
  const gameController = useGameController();
  const timerController = useTimerController();
  const audioController = useAudioController();
  const scoreController = useScoreController();
  const hintController = useHintController();
  const viewCounter = useTrackViewCounter();

  // Destructure controller methods and state
  const {
    cards,
    turns,
    choiceOne,
    choiceTwo,
    disabled,
    matched,
    animateCollapse,
    gameStarted,
    setDisabled,
    resetTurn,
    initializeGame,
    resetGameState: resetGame,
    handleChoice: gameHandleChoice,
    updateMatchedCards,
  } = gameController;

  const { elapsedTime, handleTime, clearTimer, resetTimer } = timerController;
  const { playSounds } = audioController;
  const {
    highScore,
    celebrationStatus,
    gameOverMessage,
    checkGameCompletion,
    resetGameState,
  } = scoreController;
  const {
    hintCount,
    hintCooldown,
    hintActive,
    hintCards,
    resetHints,
    cleanupHints,
  } = hintController;

  // Enhanced hint handler that uses the hint controller
  const handleHintClick = useCallback(() => {
    hintCards(
      cards,
      turns,
      elapsedTime,
      gameController.setChoiceOne,
      gameController.setChoiceTwo,
      setDisabled,
      gameController.setTurns,
      handleTime
    );
  }, [
    cards,
    turns,
    elapsedTime,
    hintCards,
    setDisabled,
    handleTime,
    gameController,
  ]);

  const handleNewGame = useCallback(() => {
    resetHints();
    resetGameState();
    resetTimer();
    playSounds.start();
    initializeGame();
  }, [resetHints, resetGameState, resetTimer, playSounds, initializeGame]);

  const handleChoice = useCallback(
    card => {
      if (elapsedTime === undefined && !gameStarted) {
        handleTime(true);
      }
      gameHandleChoice(card);
    },
    [elapsedTime, gameStarted, handleTime, gameHandleChoice]
  );

  useEffect(() => {
    if (hintActive) return;

    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        playSounds.match();
        updateMatchedCards(choiceOne.src);
        resetTurn();
      } else {
        playSounds.fail();
        const t = setTimeout(() => resetTurn(), 1000);
        return () => clearTimeout(t);
      }
    } else if (choiceOne) {
      playSounds.swap();
    }
  }, [
    choiceOne,
    choiceTwo,
    hintActive,
    setDisabled,
    playSounds,
    updateMatchedCards,
    resetTurn,
  ]);

  useEffect(() => {
    if (matched === cards.length && turns) {
      handleTime(false);
      checkGameCompletion(
        matched,
        cards.length,
        turns,
        elapsedTime,
        playSounds.celebration
      );
    }
  }, [
    matched,
    cards.length,
    turns,
    elapsedTime,
    handleTime,
    checkGameCompletion,
    playSounds.celebration,
  ]);

  useEffect(() => {
    initializeGame();
    return () => {
      clearTimer();
      cleanupHints();
    };
  }, [initializeGame, clearTimer, cleanupHints]);

  return (
    <div className='App'>
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
      <div className='button-box'>
        <button onClick={handleNewGame}>New Game</button>
        <div className='hint-box'>
          <button
            className='hint'
            onClick={handleHintClick}
            disabled={hintCooldown > 0 || hintCount <= 0 || hintActive}
          >
            {hintCooldown > 0 ? `Hint (ready in ${hintCooldown}s)` : 'Hint'}
          </button>
          <p className='hint-count'>
            {hintCount === 1 ? 'Hint Remaining: ' : 'Hints Remaining: '}
            {hintCount}
          </p>
        </div>
      </div>
      <ToggleTheme />
      <div
        className={`card-grid ${animateCollapse ? 'collapse-animation' : ''}`}
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
      <div className='results-container'>
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
