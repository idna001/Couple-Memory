// src/constants/numbers.js
export const numbers = Array.from({ length: 10 }, (_, i) =>
    i + 1 < 10 ? `0${i + 1}` : `${i + 1}`
);
