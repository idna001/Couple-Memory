import PropTypes from 'prop-types';

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  // Base styles shared between the div and img. Not including the variable rotation.
  const commonFrontStyle =
    'absolute object-scale-down bg-white max-[800px]:static max-[800px]:object-none';

  // Conditionally apply the correct rotation class.
  // When flipped: rotateY(0deg), translate-x-0, mx-auto.
  // When NOT flipped: rotateY(90deg).
  const rotationClass = flipped
    ? '[transform:rotateY(0deg)] translate-x-0 mx-auto'
    : '[transform:rotateY(90deg)]';

  const divFrontClass = `flex justify-center items-center ${commonFrontStyle} ${rotationClass}`;
  const imgFrontClass = `${commonFrontStyle} ${rotationClass}`;

  return (
    <div
      className={`relative grid place-items-center max-[800px]:py-2.5 ${flipped && card.matched ? 'animate-shake' : ''}`}
    >
      <div className={flipped ? 'flipped' : ''}>
        <div id='front' className={divFrontClass}>
          <img
            className='object-cover w-[200px] border-none blur-[2px] block max-[800px]:hidden'
            src={flipped && card.src}
            alt='card front blur background'
            width='200'
            height='200'
          />
          <img
            className={`block border-2 border-white rounded-md ${imgFrontClass} max-[800px]:w-[90%]`}
            src={flipped && card.src}
            alt='card front'
            width='200'
            height='200'
          />
        </div>
        <button
          className={`transition-all duration-200 ease-in delay-200 object-cover bg-none border-none p-0 ${flipped ? '[transform:rotateY(90deg)] delay-0' : ''}`}
          onClick={handleClick}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleClick();
            }
          }}
          aria-label='card back'
        >
          <img
            className='block border-2 border-white rounded-md max-[800px]:w-[90%]'
            src='/img/memory/cover.png'
            alt='card back'
            width='200'
            height='198'
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
