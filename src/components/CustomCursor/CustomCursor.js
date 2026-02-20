import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Update cursor position on mouse move
  useEffect(() => {
    const moveHandler = e => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    globalThis.addEventListener('mousemove', moveHandler);
    return () => globalThis.removeEventListener('mousemove', moveHandler);
  }, []);

  return (
    <div
      className='fixed w-5 h-5 bg-[#6f6f6e]/80 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out z-[9999]'
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default CustomCursor;
