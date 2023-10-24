import './SingleCard.css'

export default function SingleCard({card, handleChoice, flipped, disabled}) {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div className={`card ${flipped && card.matched ? "animation" : ""}`}>
            <div className={flipped ? "flipped" : ""}>
                <div id='front' className='front' style={{display: "flex"}}>
                    <div className="front-background image" style={{ backgroundImage: `url(${card.src})`, width: "200px", height: "200px" }}></div>
                    <div className="front image" style={{ backgroundImage: `url(${card.src})`, width: "200px", height: "200px" }}></div>
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