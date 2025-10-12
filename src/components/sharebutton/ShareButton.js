import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import PropTypes from 'prop-types';

export default function ShareButton({ highScore, highScoreRef }) {
  const [screenshotImage, setScreenshotImage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        console.log('Shared successfully!');
      } catch (error) {
        console.error('Error while sharing:', error);
      }
    } else {
      setIsDialogOpen(true);
    }
  };

  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className='relative'>
      {/* Overlay and Dialog */}
      {isDialogOpen && (
        <div className='fixed inset-0 z-40 flex items-center justify-center bg-black/50 animate-fadeIn'>
          <div className='bg-white rounded-xl shadow-xl border border-gray-300 p-6 w-[90vw] max-w-md transform transition-all duration-300 scale-100'>
            <header className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold text-gray-800'>
                Share this game
              </h3>
              <button
                onClick={closeDialog}
                className='text-gray-500 hover:text-gray-700'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </header>

            {/* Share Buttons */}
            <div className='grid grid-cols-2 gap-4 mb-5'>
              {[
                { name: 'Facebook', color: '#3b5998' },
                { name: 'Twitter', color: '#1da1f2' },
                { name: 'LinkedIn', color: '#0077B5' },
                { name: 'Email', color: '#777' },
              ].map(platform => (
                <button
                  key={platform.name}
                  className='flex items-center justify-center gap-2 border border-gray-300 text-gray-600 font-medium text-sm py-2 rounded-md hover:border-gray-400 hover:scale-[1.02] transition-transform'
                >
                  <svg
                    className='w-5 h-5'
                    fill={platform.color}
                    stroke={platform.color}
                    viewBox='0 0 24 24'
                  >
                    <circle cx='12' cy='12' r='10' />
                  </svg>
                  <span>{platform.name}</span>
                </button>
              ))}
            </div>

            {/* Link Row */}
            <div className='flex items-center justify-between bg-gray-100 rounded-md px-3 py-2'>
              <span className='truncate text-sm text-gray-700'>
                https://aa-memory.vercel.app/
              </span>
              <button
                onClick={() =>
                  navigator.clipboard.writeText('https://aa-memory.vercel.app/')
                }
                className='text-sm text-gray-600 hover:text-gray-800 font-medium'
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Share Button */}
      <button
        className='inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-400 px-6 py-2 rounded-md font-medium text-sm tracking-wide transition-colors duration-200'
        onClick={handleScreenshot}
        type='button'
        title='Share this article'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-5 h-5'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-6-6l-4 4m0 0l4 4m-4-4h12'
          />
        </svg>
        <span>Share</span>
      </button>

      {/* Inline Tailwind animation definition */}
      <div className='fixed inset-0 z-40 flex items-center justify-center bg-black/50 animate-fadeIn'></div>
    </div>
  );
}

ShareButton.propTypes = {
  highScore: PropTypes.number.isRequired,
  highScoreRef: PropTypes.shape({
    current: PropTypes.any,
  }).isRequired,
};
