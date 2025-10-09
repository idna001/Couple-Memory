import './sharebutton.css';
import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import PropTypes from 'prop-types';

export default function ShareButton({ highScore, highScoreRef }) {
  const [screenshotImage, setScreenshotImage] = useState(null);

  const shareDialog = document.querySelector('.share-dialog');
  const closeButton = document.querySelector('.close-button');
  const handleScreenshot = () => {
    html2canvas(highScoreRef.current, {
      useCORS: true,
      backgroundColor: 'black',
    })
      .then(canvas => {
        const image = canvas.toDataURL('image/jpeg');
        setScreenshotImage(image);
        const a = document.createElement('a');
        a.href = image;
        a.download = 'high_score_screenshot.jpeg';
        a.click();
      })
      .catch(error => {
        console.error('Error capturing screenshot:', error);
      });
    shareContent();
  };
  const shareContent = async () => {
    if (navigator.share && screenshotImage) {
      try {
        await navigator.share({
          title: 'High Score Screenshot',
          text: `I achieved a high score of ${highScore} in A&A Match!`,
          url: 'https://aa-memory.vercel.app/',
          files: [
            new File(['highScore'], screenshotImage, { type: 'image/jpeg' }),
          ],
        });
        console.log('Sharing successfully!');
      } catch (error) {
        console.error('Error while sharing: ', error);
      }
    } else {
      shareDialog.classList.add('is-open');
      closeButton.addEventListener('click', event => {
        shareDialog.classList.remove('is-open');
      });
    }
  };
  const closeDialog = () => {
    shareDialog.classList.remove('is-open');
  };
  return (
    <div className='card'>
      <div className='share-dialog'>
        <header>
          <h3 className='dialog-title'>Share this pen</h3>
          <button className='close-button'>
            <svg>
              <use href='#close'></use>
            </svg>
          </button>
        </header>
        <div className='targets'>
          <button className='button'>
            <svg>
              <use href='#facebook'></use>
            </svg>
            <span>Facebook</span>
          </button>

          <button className='button'>
            <svg>
              <use href='#twitter'></use>
            </svg>
            <span>Twitter</span>
          </button>

          <button className='button'>
            <svg>
              <use href='#linkedin'></use>
            </svg>
            <span>LinkedIn</span>
          </button>

          <button className='button'>
            <svg>
              <use href='#email'></use>
            </svg>
            <span>Email</span>
          </button>
        </div>
        <div className='link'>
          <div className='pen-url'>https://aa-memory.vercel.app/</div>
          <button className='copy-link'>Copy Link</button>
        </div>
      </div>

      <button
        className='share-button'
        onClick={handleScreenshot}
        type='button'
        title='Share this article'
      >
        <svg>
          <use href='#share-icon'></use>
        </svg>
        <span>Share</span>
      </button>

      <svg className='hidden'>
        <defs>
          <symbol
            id='share-icon'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='feather feather-share'
          >
            <path d='M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8'></path>
            <polyline points='16 6 12 2 8 6'></polyline>
            <line x1='12' y1='2' x2='12' y2='15'></line>
          </symbol>

          <symbol
            id='facebook'
            viewBox='0 0 24 24'
            fill='#3b5998'
            stroke='#3b5998'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='feather feather-facebook'
          >
            <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'></path>
          </symbol>

          <symbol
            id='twitter'
            viewBox='0 0 24 24'
            fill='#1da1f2'
            stroke='#1da1f2'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='feather feather-twitter'
          >
            <path d='M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z'></path>
          </symbol>

          <symbol
            id='email'
            viewBox='0 0 24 24'
            fill='#777'
            stroke='#fafafa'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='feather feather-mail'
          >
            <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'></path>
            <polyline points='22,6 12,13 2,6'></polyline>
          </symbol>

          <symbol
            id='linkedin'
            viewBox='0 0 24 24'
            fill='#0077B5'
            stroke='#0077B5'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='feather feather-linkedin'
          >
            <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'></path>
            <rect x='2' y='9' width='4' height='12'></rect>
            <circle cx='4' cy='4' r='2'></circle>
          </symbol>

          <symbol
            onClick={closeDialog}
            id='close'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='feather feather-x-square'
          >
            <rect x='3' y='3' width='18' height='18' rx='2' ry='2'></rect>
            <line x1='9' y1='9' x2='15' y2='15'></line>
            <line x1='15' y1='9' x2='9' y2='15'></line>
          </symbol>
        </defs>
      </svg>
    </div>
  );
}

// PropTypes validation
ShareButton.propTypes = {
  highScore: PropTypes.number.isRequired,
  highScoreRef: PropTypes.shape({
    current: PropTypes.any,
  }).isRequired,
};
