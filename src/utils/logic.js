export function secureShuffleArray(array) {
  const cryptoObj = globalThis.crypto || globalThis.msCrypto;
  for (let i = array.length - 1; i > 0; i--) {
    const r = new Uint32Array(1);
    cryptoObj.getRandomValues(r);
    const j = r[0] % (i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function pickRandomImages(arr, count) {
  if (count > arr.length) return [];
  const cryptoObj = globalThis.crypto || globalThis.msCrypto;
  const shuffled = [...arr].sort(() => {
    const a = new Uint32Array(1);
    const b = new Uint32Array(1);
    cryptoObj.getRandomValues(a);
    cryptoObj.getRandomValues(b);
    return a[0] - b[0];
  });
  return shuffled.slice(0, count);
}
