import React, { useRef } from 'react';
import ShareButton from './../sharebutton/ShareButton';
import PropTypes from 'prop-types';
// import './Celebration.css'; // Remove

export default function Celebration({
  highScore,
  elapsedTime,
  handleRestartGame,
}) {
  const highScoreRef = useRef(null);
  const baseButtonStyle =
    'text-text bg-background border-2 border-current rounded hover:bg-[green] hover:text-white transition-colors duration-200';

  return (
    <div className='celebration-container'>
      <div className='fixed top-[30%] left-1/2 -translate-x-1/2 z-[250] text-[#00ffff] text-[3rem] w-full bg-[#000000cc] animate-fade p-4'>
        <p ref={highScoreRef} className='my-2'>
          Highscore achieved:{' '}
          <span className='text-[#adff2f] text-[4rem] align-middle'>
            {highScore}
          </span>
          <br />
        </p>
        {
          <p>
            <span className='text-[#adff2f] text-[4rem] align-middle'>
              {elapsedTime}s
            </span>
          </p>
        }
        <div className='m-[2px]'>
          <ShareButton highScore={highScore} highScoreRef={highScoreRef} />
        </div>
        <button
          onClick={handleRestartGame}
          className={`${baseButtonStyle} absolute top-[94%] left-1/2 translate-x-[6%] -translate-y-1/2 px-[20px] py-[10px] text-[14px] font-medium leading-[1.1] tracking-[2px]`}
        >
          Restart Game
        </button>
      </div>
    </div>
  );
}

// PropTypes validation
Celebration.propTypes = {
  highScore: PropTypes.number.isRequired,
  elapsedTime: PropTypes.number.isRequired,
  handleRestartGame: PropTypes.func.isRequired,
};
