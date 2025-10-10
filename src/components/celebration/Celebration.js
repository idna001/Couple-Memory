import React, { useRef } from 'react';
import ShareButton from './../sharebutton/ShareButton';
import PropTypes from 'prop-types';

export default function Celebration({
  highScore,
  elapsedTime,
  handleRestartGame,
}) {
  const highScoreRef = useRef(null);

  return (
    <div className='fixed top-[30%] left-1/2 -translate-x-1/2 z-[250] text-cyan-300 text-5xl w-full bg-black/80 animate-fade text-center p-6 rounded-xl shadow-xl'>
      <p ref={highScoreRef} className='font-semibold'>
        Highscore achieved:{' '}
        <span className='text-[greenyellow] text-[4rem] mt-[0.4px] block'>
          {highScore}
        </span>
      </p>

      <p className='mt-2 mb-4'>
        <span className='text-[greenyellow] text-[4rem]'>{elapsedTime}s</span>
      </p>

      <div className='flex justify-center m-[2px]'>
        <ShareButton highScore={highScore} highScoreRef={highScoreRef} />
      </div>

      <button
        onClick={handleRestartGame}
        className='absolute top-[94%] left-1/2 translate-x-[6%] -translate-y-1/2 
                   px-5 py-2.5 text-[14px] font-medium leading-[1.1] tracking-[2px] 
                   m-[2px] btn btn-primary'
      >
        Restart Game
      </button>
    </div>
  );
}

// PropTypes validation
Celebration.propTypes = {
  highScore: PropTypes.number.isRequired,
  elapsedTime: PropTypes.number.isRequired,
  handleRestartGame: PropTypes.func.isRequired,
};
