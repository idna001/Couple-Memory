import {useEffect, useState} from "react";
import './App.css'
import SingleCard from "./components/SingleCard";
import Celebration from "./components/Celebration";

const cardImages = [
    { "src": "/img/IMG_0816.JPG", matched: false},
    { "src": "/img/IMG_2256.jpg", matched: false },
    { "src": "/img/IMG_3493.jpg", matched: false },
    { "src": "/img/IMG_3946.jpg", matched: false },
    {"src": "/img/IMG_4808.jpg", matched: false },
    { "src": "/img/IMG_6324.jpg", matched: false }
]
//this is function App 
function App() {
    const [cards, setCards] = useState([])
    const [turns, setTurns] =useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [highScore, setHighScore] = useState(0)
    const [matched, setMatched] = useState(0)
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
    }

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    useEffect(() => {

        if (choiceOne && choiceTwo) {
            setDisabled(true)
            if (choiceOne.src === choiceTwo.src) {
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
                setTimeout(() => resetTurn(), 1000)
            }
        }
    }, [choiceOne, choiceTwo])

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    useEffect(()=>{
        if (matched === cards.length && turns){
            // Game over
            const m_highscore = window.localStorage.getItem("highscore")
            if (m_highscore === null || turns < Number(m_highscore)){
                // New highscore
                window.localStorage.setItem("highscore", turns)
                new Audio("celebration.mp3").play()
                setCelebrationStatus(true)
                setTimeout(()=>{
                    setCelebrationStatus(false)
                }, 4500)
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
        {celebrationStatus && <Celebration highscore={highScore}/>}
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

        <div id="views">
            <p>This memory got <span id="visits"></span> views.</p>
        </div>
        </div>
         );
}
export default App
