import React from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export default function ShowConfetti() {
  const { width, height } = useWindowSize();
  return (
    <Confetti
      numberOfPieces={500}
      width={width - 20}
      height={height}
      recycle={false}
      className="z-[999]"
    />
  );
}
