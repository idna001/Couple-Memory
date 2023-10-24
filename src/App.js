import { useEffect, useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import SingleCard from "./components/SingleCard";
import Celebration from "./components/Celebration";
import ShowConfetti from "./components/Confetti";
import toggleTheme from "./components/toggleTheme";
import * as cardController from "./controllers/cardcontroller"



const max_images = 10;
const numbers = Array.from({ length: max_images }, (_, index) => {
  const number = index + 1;
  return number < 10 ? `0${number}` : `${number}`;
});


function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [matched, setMatched] = useState(0);
  const [celebrationStatus, setCelebrationStatus] = useState(false);
  const [elapsedTime, setTime] = useState(undefined);
  const [intervalId, setIntervalId] = useState(undefined);
  const [animateCollapse, setAnimateCollapse] = useState(false);

  const shuffledCards = () => {
    const selectedImages = cardController.pickRandomImages(cardController.cardImages, 6);

    const shuffledCards = [...selectedImages, ...selectedImages]
      .sort(() => {
        const randomA = nanoid(16); // Erhöhe die Zeichenfolgenlänge auf 16
        const randomB = nanoid(16); // Erhöhe die Zeichenfolgenlänge auf 16
        return randomA.localeCompare(randomB);
      })
      .map((card) => ({ ...card, id: Math.random() }));
    cardController.secureShuffleArray(numbers);

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setMatched(0);
    setCelebrationStatus(false);
    setTime(undefined);
    clearInterval(intervalId);
    setAnimateCollapse(true);

    setTimeout(() => {
      setAnimateCollapse(false);
    }, 1200);
  };

  const handleNewGame = () => {
    const audioElement = new Audio("audio/start.mp3");
    audioElement.play();
    shuffledCards();
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    if (elapsedTime === undefined) handleTime(true);
  };
  const handleTime = (start) => {
    if (start) {
      setIntervalId(
        setInterval(async () => {
          setTime((elapsedTime) => elapsedTime + 1 || 0);
        }, 1000)
      );
    } else {
      clearInterval(intervalId);
    }
  };
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        soundEffect.src = "audio/match.wav";
        soundEffect.play();
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return {
                ...card,
                matched: true,
              };
            } else {
              return card;
            }
          });
        });
        resetTurn();
        setMatched((prevMatched) => prevMatched + 2);
      } else {
        soundEffect.src = "audio/fail.wav";
        soundEffect.play();
        setTimeout(() => resetTurn(), 1000);
      }
    } else if (choiceOne) {
      soundEffect.src = "audio/swap.wav";
      soundEffect.play();
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };
  const soundEffect = new Audio();
  soundEffect.autoplay = true;

  useEffect(() => {
    if (matched === cards.length && turns) {
      // Game over
      const m_highscore = window.localStorage.getItem("highscore");
      const runtime = window.localStorage.getItem("runtime");
      handleTime(false);
      if (
        m_highscore === null ||
        turns < Number(m_highscore) ||
        (turns === Number(m_highscore) && elapsedTime < runtime)
      ) {
        // New highscore
        window.localStorage.setItem("highscore", turns);
        window.localStorage.setItem("runtime", elapsedTime);
        soundEffect.src = "audio/celebration.mp3";
        soundEffect.play();
        setCelebrationStatus(true);
        setHighScore(turns);
      }
    }
  }, [matched]);

  useEffect(() => {
    shuffledCards();
    // Load highscore value from localstorage
    const m_highscore = window.localStorage.getItem("highscore") || 0;
    setHighScore(m_highscore);
  }, []);

  return (
    <div className="App">
      {celebrationStatus && (
        <Celebration highscore={highScore} time={elapsedTime} />
      )}
      {celebrationStatus && <ShowConfetti />}
      <h1>A&A Match</h1>
      <button onClick={handleNewGame}>New Game</button>
      <button id="theme-toggle" onClick={toggleTheme}>
        dark
      </button>
      <div
        className={`card-grid ${animateCollapse ? "collapse-animation" : ""}`}
      >
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
    </div>
  );
}
export default App;
