import "./../celebration/Celebration.css";
import React from "react";
import PropTypes from "prop-types";

export default function GameOver({ score, elapsedTime }) {
  return (
    <div className="celebration-container">
      <div className="celebration-notification">
        <p>
          Game Over! Your Score: <span>{score}</span>
          <br />
        </p>
        {
          <p>
            <span>{elapsedTime}s</span>
          </p>
        }
      </div>
    </div>
  );
}

// PropTypes validation
GameOver.propTypes = {
  score: PropTypes.number.isRequired,
  elapsedTime: PropTypes.number.isRequired,
};
