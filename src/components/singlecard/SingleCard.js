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
        <button
          className="back"
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleClick();
            }
          }}
          aria-label="card back"
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <img
            src="/img/memory/cover.png"
            alt="card back"
            width="200"
            height="200"
          />
        </button>
      </div>
    </div>
  );
}

// PropTypes Validation
SingleCard.propTypes = {
  card: PropTypes.shape({
    src: PropTypes.string.isRequired,
    matched: PropTypes.bool.isRequired,
  }).isRequired,
  handleChoice: PropTypes.func.isRequired,
  flipped: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};
