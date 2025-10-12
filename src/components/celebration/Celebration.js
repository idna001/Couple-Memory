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
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        width: '90%',
        maxWidth: '500px',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '40px 30px',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        animation: 'fadeIn 0.5s ease-in-out',
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <p
        ref={highScoreRef}
        style={{
          margin: 0,
          padding: 0,
          fontSize: '24px',
          fontWeight: '600',
          color: '#06b6d4',
          marginBottom: '20px',
        }}
      >
        Highscore achieved:{' '}
        <span
          style={{
            color: '#84cc16',
            fontSize: '32px',
            fontWeight: 'bold',
            display: 'inline-block',
            marginLeft: '10px',
          }}
        >
          {highScore}
        </span>
      </p>

      <p
        style={{
          margin: 0,
          padding: 0,
          fontSize: '18px',
          color: '#06b6d4',
          marginBottom: '30px',
        }}
      >
        Time:{' '}
        <span
          style={{
            color: '#84cc16',
            fontWeight: 'bold',
          }}
        >
          {elapsedTime}s
        </span>
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          alignItems: 'center',
        }}
      >
        <ShareButton highScore={highScore} highScoreRef={highScoreRef} />
        <button
          onClick={handleRestartGame}
          style={{
            padding: '12px 24px',
            border: '2px solid #06b6d4',
            backgroundColor: 'transparent',
            color: '#06b6d4',
            fontWeight: '600',
            fontSize: '16px',
            borderRadius: '6px',
            cursor: 'pointer',
            width: '100%',
            transition: 'all 0.3s ease',
            boxSizing: 'border-box',
          }}
          onMouseEnter={e => {
            e.target.style.backgroundColor = 'rgba(6, 182, 212, 0.1)';
            e.target.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={e => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.transform = 'scale(1)';
          }}
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
