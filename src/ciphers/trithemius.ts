import { isUpperCase, mod, modInv } from '@/utils';

const helper = (text: string, getKey: (x: number) => number, alphabet: string) => {
  let res = '';

  for (let i = 0; i < text.length; i++) {
    const x = alphabet.indexOf(text[i].toLowerCase());

    if (x === -1) {
      res += text[i];
      continue;
    }

    const isUpper = isUpperCase(text[i]);

    const newChar = alphabet[mod(getKey(x), alphabet.length)];
    res += isUpper ? newChar.toUpperCase() : newChar;
  }

  return res;
};

export default {
  encode: {
    linear: (text: string, coefA: number, coefB: number, alphabet: string) => {
      const getKey = (x: number) => coefA * x + coefB;
      return helper(text, getKey, alphabet);
    },
    nonlinear: (text: string, coefA: number, coefB: number, coefC: number, alphabet: string) => {
      const getKey = (x: number) => coefA * x ** 2 + x * coefB + coefC;
      return helper(text, getKey, alphabet);
    },
  },

  decode: {
    linear: (text: string, coefA: number, coefB: number, alphabet: string) => {
      const getKeyInv = (y: number) => (y - coefB) * modInv(coefA, alphabet.length);
      return helper(text, getKeyInv, alphabet);
    },
    nonlinear: (text: string, coefA: number, coefB: number, coefC: number, alphabet: string) => {
      const getKey = (y: number) => {
        const discriminant = coefB ** 2 - 4 * coefA * (coefC - y);
        const sqrtDiscriminant = Math.sqrt(Math.abs(discriminant));
        const x1 = (-coefB + sqrtDiscriminant) / (2 * coefA);
        const x2 = (-coefB - sqrtDiscriminant) / (2 * coefA);

        const x = Math.round(x1) === x1 ? x1 : x2;
        return Math.floor(x);
      };

      return helper(text, getKey, alphabet);
    },
  },
};
