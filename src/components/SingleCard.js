import "./SingleCard.css";
import PropTypes from "prop-types";

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className={`card ${flipped && card.matched ? "animation" : ""}`}>
      <div className={flipped ? "flipped" : ""}>
        <div id="front" className="front" style={{ display: "flex" }}>
          <img
            className="front-background"
            src={card.src}
            alt="card front blur background"
            width="200"
            height="200"
          />
          <img
            className="front"
            src={card.src}
            alt="card front"
            width="200"
            height="200"
          />
        </div>
        <img
          className="back"
          src="/img/cover.png"
          onClick={handleClick}
          alt="card back"
          width="200"
          height="198"
        />
      </div>
    </div>
  );
}

// PropTypes validation
SingleCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired, // The image source of the card front
    matched: PropTypes.bool.isRequired, // Whether the card is matched or not
  }).isRequired,
  handleChoice: PropTypes.func.isRequired, // Function to handle card choice
  flipped: PropTypes.bool.isRequired, // Boolean for whether the card is flipped
  disabled: PropTypes.bool.isRequired, // Boolean to disable interaction
};
