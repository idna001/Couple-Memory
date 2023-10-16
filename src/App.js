import {useEffect, useState} from "react";
import './App.css'
import SingleCard from "./components/SingleCard";
import Celebration from "./components/Celebration";

const crypto = require('crypto');
let cardImages = [];
const max_images = 10;
const numbers = Array.from({ length: max_images }, (_, index) => {
    const number = index + 1;
    return (number < 10) ? `0${number}` : `${number}`;
});

function secureShuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(crypto.randomBytes(1)[0] / 256 * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

cardImages = [
    { "src": "/img/Bild01.png", matched: false},
    { "src": "/img/Bild02.png", matched: false },
    { "src": "/img/Bild03.png", matched: false },
    { "src": "/img/Bild04.png", matched: false },
    { "src": "/img/Bild06.png", matched: false },
    { "src": "/img/IMG_0479.jpeg", matched: false },
    { "src": "/img/IMG_0503.jpeg", matched: false },
    { "src": "/img/IMG_0528.jpeg", matched: false },
    { "src": "/img/IMG_0848.jpeg", matched: false },
    { "src": "/img/IMG_1131.jpeg", matched: false },
    { "src": "/img/IMG_1564.jpeg", matched: false },
    { "src": "/img/IMG_4555.jpeg", matched: false },
    { "src": "/img/IMG_4623.jpeg", matched: false },
    { "src": "/img/IMG_9475.jpeg", matched: false },
    { "src": "/img/IMG_9483.jpeg", matched: false },
    { "src": "/img/20230218-182954.jpeg", matched: false },
    { "src": "/img/Bild.png", matched: false },
];

function pickRandomImages(cardImages, count) {
    if (count > cardImages.length) {
        console.error("Die Anzahl der ausgewählten Bilder darf nicht größer sein als die Anzahl der verfügbaren Bilder.");
        return [];
    }
    const shuffledImages = [...cardImages].sort(() => Math.random() - 0.5); // Zufällige Reihenfolge
    return shuffledImages.slice(0, count);
}

function App() {
    const [cards, setCards] = useState([])
    const [turns, setTurns] =useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [highScore, setHighScore] = useState(0)
    const [matched, setMatched] = useState(0)
    const [celebrationStatus, setCelebrationStatus] = useState(false)
    const [elapsedTime, setTime] = useState(undefined)
    const [intervalId, setIntervalId] = useState(undefined)

    const shuffledCards = () => {
        const selectedImages = pickRandomImages(cardImages, 6);
        const shuffledCards = [...selectedImages, ...selectedImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random() }))

        secureShuffleArray(numbers)

        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)
        setMatched(0)
        setCelebrationStatus(false)
        setTime(undefined)
        clearInterval(intervalId)
    }

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
        if(elapsedTime === undefined)   handleTime(true)
    }
    const handleTime = (start) => {
        if(start){
            setIntervalId(
                setInterval(async () => {
                    setTime(elapsedTime => elapsedTime+1 || 0)
                }, 1000)
            )
        }else{
            clearInterval(intervalId)
        }
    }
    useEffect(() => {

        if (choiceOne && choiceTwo) {
            setDisabled(true)
            if (choiceOne.src === choiceTwo.src) {
                soundEffect.src="audio/match.wav"
                soundEffect.play()
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return {
                                ...card, matched: true}
                            } else {
                                return card
                            }
                    })
                })
             resetTurn()
                setMatched(prevMatched => prevMatched + 2)
            } else {
                soundEffect.src = "audio/fail.wav"
                soundEffect.play()
                setTimeout(() => resetTurn(), 1000)
            }
        }else if(choiceOne){
            soundEffect.src = "audio/swap.wav"
            soundEffect.play()
        }
    }, [choiceOne, choiceTwo])

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }
    const soundEffect = new Audio();
    soundEffect.autoplay = true;

    useEffect(()=>{
        if (matched === cards.length && turns){
            // Game over
            const m_highscore = window.localStorage.getItem("highscore")
            handleTime(false)
            if (m_highscore === null || turns < Number(m_highscore)){
                // New highscore
                window.localStorage.setItem("highscore", turns)
                soundEffect.src = "audio/celebration.mp3"
                soundEffect.play()
                setCelebrationStatus(true)
                setHighScore(turns)
            }
        }
    }, [matched])

    useEffect(() => {
        shuffledCards()
            // Load highscore value from localstorage
            const m_highscore = window.localStorage.getItem("highscore") || 0
            setHighScore(m_highscore)
        }, [])

return (
    <div className="App">
        {celebrationStatus && <Celebration highscore={highScore} time={elapsedTime}/>}
        <h1>A&A Match</h1>
        <button onClick={shuffledCards}>New Game</button>

        <div className="card-grid">
            {cards.map(card => (
                <SingleCard
                    key={card.id}
                    card={card}
                    handleChoice={handleChoice}
                    flipped={card === choiceOne || card === choiceTwo || card.matched}
                    disabled={disabled}/>
                    ))}
                </div>
        <p>Turns: {turns}</p>
        <p>HighScore: {highScore}</p>
        <p>Time Elapsed: {elapsedTime || "Not started"}</p>

        <div id="views">
            <p>This memory got <span id="visits"></span> views.</p>
        </div>
        </div>
         );
}
export default App
