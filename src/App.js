import {useEffect, useState} from "react";
import './App.css'
import SingleCard from "./components/SingleCard";

const cardImages = [
    { "src": "/img/IMG_0816.jpg", matched: false},
    { "src": "/img/IMG_2256.jpg", matched: false },
    { "src": "/img/IMG_3493.jpg", matched: false },
    { "src": "/img/IMG_3946.jpg", matched: false },
    {"src": "/img/IMG_4808.jpg", matched: false },
    { "src": "/img/IMG_6324.jpg", matched: false }
]
function App() {
    const [cards, setCards] = useState([])
    const [turns, setTurns] =useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)

    //shuffle
    const shuffledCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random() }))

        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)
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

    useEffect(() => {
        shuffledCards()
    }, [])


return (

    <div className="App">
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

        <div id="views">
            <p>This memory got <span id="visits"></span> views.</p>
        </div>
        </div>
         );
}
export default App