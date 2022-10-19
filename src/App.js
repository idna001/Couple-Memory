import {useEffect, useState} from "react";
import './App.css'
import SingleCard from "./components/SingleCard";
import Celebration from "./components/Celebration";

const cardImages = [
    { "src": "/img/IMG_0816.JPG", matched: false},
    { "src": "/img/IMG_2256.jpg", matched: false },
    { "src": "/img/IMG_3493.jpg", matched: false },
    { "src": "/img/IMG_3946.jpg", matched: false },
    { "src": "/img/IMG_4808.jpg", matched: false },
    { "src": "/img/IMG_6324.jpg", matched: false }
]
function App() {
    const [cards, setCards] = useState([])
    const [turns, setTurns] =useState(0)

    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [matched, setMatched] = useState(0)


    const [highScore, setHighScore] = useState(0)
    const [fastest_run, setFastestRun] = useState(0)

    const [elapsedTime, setTime] = useState(undefined)
    const [intervalId, setIntervalId] = useState(undefined)

    const [celebrationStatus, setCelebrationStatus] = useState(false)

    //shuffle
    const shuffledCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random() }))

        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)
        setMatched(0)
        setCelebrationStatus(false)
        setTime(0)
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
            const m_highscore = window.localStorage.getItem("highScore")
            const m_fastest_run = window.localStorage.getItem("fastest_run")

            handleTime(false)
            if (m_highscore === null || turns < Number(m_highscore) && elapsedTime < Number(m_fastest_run) ){
                // New highScore
                window.localStorage.setItem("highScore", turns)
                window.localStorage.setItem("fastest_run", elapsedTime)
                soundEffect.src = "audio/celebration.mp3"
                soundEffect.play()
                setCelebrationStatus(true)
                setHighScore(turns)
                setFastestRun(elapsedTime)

            }
        }
    }, [matched])

    useEffect(() => {
        shuffledCards()
        // Load highScore value from localstorage
        const m_highscore = window.localStorage.getItem("highScore") || 0
		setHighScore(m_highscore)

        const m_fastest_run = window.localStorage.getItem("fastest_run") || 0
        setFastestRun(m_fastest_run)
}, [])

return (
    <div className="App">
        {celebrationStatus && <Celebration highscore={highScore} elapsedTime={elapsedTime}/>}
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
        <p>HighScore: {highScore} by {fastest_run}</p>
        <p>Time Elapsed: {elapsedTime || "Not started"}</p>

        <div id="views">
            <p>This memory got <span id="visits"></span> views.</p>
        </div>
        </div>
         );
}
export default App
