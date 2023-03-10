import { mod } from '@/utils';
import { Locale } from '@/utils/types';

const helper = (text = '', shift = 0, locale: Locale = 'en') => {
  const alphabet = {
    en: ' abcdefghijklmnopqrstuvwxyz',
    ua: ' абвгґдеєжзиіїйклмнопрстуфхцчшщьюя',
  }[locale];

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
  encode: (text: string, shift: number, locale: Locale = 'en') => helper(text, shift, locale),
  decode: (text: string, shift: number, locale: Locale = 'en') => helper(text, -shift, locale),
};
