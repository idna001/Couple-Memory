import React from 'react';
import PropTypes from 'prop-types';

export default function GameOver({ score, elapsedTime, handleRestartGame }) {
  const baseButtonStyle = "text-text bg-background border-2 border-current rounded hover:bg-[green] hover:text-white transition-colors duration-200 px-3 py-1.5 font-bold";

  return (
    <div className='celebration-container'>
      <div className='fixed top-[30%] left-1/2 -translate-x-1/2 z-[250] text-[#00ffff] text-[3rem] w-full bg-[#000000cc] animate-fade p-4'>
        <p className="my-2">
          Game Over! Your Score: <span className="text-[#adff2f] text-[4rem] align-middle">{score}</span>
          <br />
        </p>
        {
          <p>
            <span className="text-[#adff2f] text-[4rem] align-middle">{elapsedTime}s</span>
          </p>
        }
        <button onClick={handleRestartGame} className={`${baseButtonStyle} mt-4`}>
          Restart Game
        </button>
      </div>
    </div>
  );
}

// PropTypes validation
GameOver.propTypes = {
  score: PropTypes.number.isRequired,
  elapsedTime: PropTypes.number.isRequired,
  handleRestartGame: PropTypes.func.isRequired,
};
