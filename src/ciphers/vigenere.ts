import { isUpperCase, mod } from '@/utils';

const helper = (text: string, motto: string, alphabet: string, getKey: (x: number, y: number) => number) => {
  let res = '';
  let count = 0;

  for (let i = 0; i < text.length; i++) {
    const x = alphabet.indexOf(text[i].toLowerCase());

    if (x === -1) {
      count++;
      res += text[i];
      continue;
    }

    const isUpper = isUpperCase(text[i]);

    const y = alphabet.indexOf(motto[mod(i - count, motto.length)]);
    const newChar = alphabet[mod(getKey(x, y), alphabet.length)];
    res += isUpper ? newChar.toUpperCase() : newChar;
  }

  return res;
};

export default {
  encode: (text: string, motto: string, alphabet: string) => helper(text, motto, alphabet, (x, y) => x + y),
  decode: (text: string, motto: string, alphabet: string) => helper(text, motto, alphabet, (x, y) => x - y),
};
