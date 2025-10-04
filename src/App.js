// src/App.js
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import SingleCard from "./components/singlecard/SingleCard";
import Celebration from "./components/celebration/Celebration";
import toggleTheme from "./components/toggleTheme/toggleTheme";
import ShowConfetti from "./components/confetti/Confetti";
import GameOver from "./components/gameover/GameOver";
import CustomCursor from "./components/CustomCursor/CustomCursor";

import { cardImages } from "./data/cardImages";
import { numbers } from "./constants/numbers";
import { secureShuffleArray, pickRandomImages } from "./utils/logic";

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
    const [animateCollapse, setAnimateCollapse] = useState(false);
    const [gameOverMessage, setGameOverMessage] = useState(false);

    const soundEffect = useMemo(() => {
        const audio = new Audio();
        audio.autoplay = true;
        return audio;
    }, []);

    const playSound = useCallback(
        (src) => {
            soundEffect.src = src;
            soundEffect.load();
            soundEffect.play().catch(() => { });
        },
        [soundEffect]
    );

    const resetTurn = useCallback(() => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((prev) => prev + 1);
        setDisabled(false);
    }, []);

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

    const shuffledCards = useCallback(() => {
        const selected = pickRandomImages(cardImages, 6);
        const dup = [...selected, ...selected]
            .sort(() => nanoid(16).localeCompare(nanoid(16)))
            .map((card) => {
                const crypto = window.crypto || window.msCrypto;
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
        playSound("audio/start.mp3");
        shuffledCards();
    }, [playSound, shuffledCards]);

    const handleChoice = useCallback(
        (card) => {
            if (disabled) return;
            choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
            if (elapsedTime === undefined) handleTime(true);
        },
        [choiceOne, disabled, elapsedTime, handleTime]
    );

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                playSound("/audio/match.wav");
                setCards((prev) =>
                    prev.map((c) => (c.src === choiceOne.src ? { ...c, matched: true } : c))
                );
                setMatched((prev) => prev + 2);
                resetTurn();
            } else {
                playSound("/audio/fail.wav");
                const t = setTimeout(() => resetTurn(), 1000);
                return () => clearTimeout(t);
            }
        } else if (choiceOne) {
            playSound("/audio/swap.wav");
        }
    }, [choiceOne, choiceTwo, resetTurn, playSound]);

    useEffect(() => {
        if (matched === cards.length && turns) {
            handleTime(false);
            const storedHigh = window.localStorage.getItem("highscore");
            const storedRun = window.localStorage.getItem("runtime");
            const better =
                storedHigh === null ||
                turns < Number(storedHigh) ||
                (turns === Number(storedHigh) && elapsedTime < Number(storedRun));

            if (better) {
                window.localStorage.setItem("highscore", turns);
                window.localStorage.setItem("runtime", elapsedTime);
                playSound("audio/celebration.mp3");
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
        const hs = Number(window.localStorage.getItem("highscore") || 0);
        setHighScore(hs);
        return () => clearTimer();
    }, [shuffledCards, clearTimer]);

    return (
            <div className="App">
                <CustomCursor />
                {celebrationStatus && (
                    <Celebration highScore={highScore} elapsedTime={elapsedTime} handleRestartGame={handleNewGame} />
                )}
                {celebrationStatus && <ShowConfetti />}
                <img src="/img/logo.png" alt="A&A Match" style={{ height: "60px" }} />
                <br />
                <button onClick={handleNewGame}>New Game</button>
                <button id="theme-toggle" onClick={toggleTheme}>
                    dark
                </button>
                <div className={`card-grid ${animateCollapse ? "collapse-animation" : ""}`}>
                    {cards.map((card) => (
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
                <div className="results-container">
                    <p>HighScore: {highScore}</p>
                    <p>Runtime: {window.localStorage.getItem("runtime") || 0}</p>
                </div>
                <p>Time Elapsed: {elapsedTime || "Not started"}</p>
                {gameOverMessage && <GameOver score={turns} elapsedTime={elapsedTime} handleRestartGame={handleNewGame} />}

        </div>
    );
}

export default App;
