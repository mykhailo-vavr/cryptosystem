import { mod } from '@/utils';

const helper = (text = '', shift = 0, alphabet = '') => {
  let res = '';

  for (let i = 0; i < text.length; i++) {
    if (!alphabet.includes(text[i])) {
      res += text[i];
      continue;
    }

    res += alphabet[mod(alphabet.indexOf(text[i]) + shift, alphabet.length)];
  }

  return res;
};

export default {
  encode: (text: string, shift: number, alphabet: string) => helper(text, shift, alphabet),
  decode: (text: string, shift: number, alphabet: string) => helper(text, -shift, alphabet),
};
