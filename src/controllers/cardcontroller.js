import { nanoid } from "nanoid";

export const cardImages = [
    { src: "/img/Bild01.png", matched: false },
    { src: "/img/Bild02.png", matched: false },
    { src: "/img/Bild03.png", matched: false },
    { src: "/img/Bild04.png", matched: false },
    { src: "/img/Bild06.png", matched: false },
    { src: "/img/IMG_0479.jpeg", matched: false },
    { src: "/img/IMG_0503.jpeg", matched: false },
    { src: "/img/IMG_0528.jpeg", matched: false },
    { src: "/img/IMG_0848.jpeg", matched: false },
    { src: "/img/IMG_1131.jpeg", matched: false },
    { src: "/img/IMG_1564.jpeg", matched: false },
    { src: "/img/IMG_4555.jpeg", matched: false },
    { src: "/img/IMG_4623.jpeg", matched: false },
    { src: "/img/IMG_9475.jpeg", matched: false },
    { src: "/img/IMG_9483.jpeg", matched: false },
    { src: "/img/20230218-182954.jpeg", matched: false },
  ];

export function secureShuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(nanoid(64) * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

export function pickRandomImages(cardImages, count) {
    if (count > cardImages.length) {
      console.error(
        "Die Anzahl der ausgewählten Bilder darf nicht größer sein als die Anzahl der verfügbaren Bilder."
      );
      return [];
    }
    const shuffledImages = [...cardImages].sort(() => {
      const randomA = nanoid(16);
      const randomB = nanoid(16);
      return randomA.localeCompare(randomB);
    });
    const selectedImages = shuffledImages.slice(0, count);
  
    return selectedImages;
  };
  