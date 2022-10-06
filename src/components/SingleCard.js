import './SingleCard.css'

export default function SingleCard({card, handleChoice, flipped, disabled}) {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <div id='front' className='front' style={{display: "flex"}}>
                    <img className="front-background" src={card.src} alt="card front blur background" width="200" height="200"   />
                    <img className="front" src={card.src} alt="card front" width="200" height="200"   />
                </div>
                <img
                    className="back"
                    src="/img/cover.png"
                    onClick={handleClick}
                    alt="card back"
                    width="200" height="198"                 />
            </div>
        </div>
    )
}