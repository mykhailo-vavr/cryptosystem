import caesar from '@/ciphers/caesar';
import { LocalesEnum } from '@/utils';

export type AttackResultsType = Record<LocalesEnum, { key: number; value: string }[]>;

export const attack = (cipher = '') => {
  const alphabets: Record<LocalesEnum, string> = {
    [LocalesEnum.EN]: ' abcdefghijklmnopqrstuvwxyz',
    [LocalesEnum.UA]: ' абвгґдеєжзиіїйклмнопрстуфхцчшщьюя',
  };

  const results: AttackResultsType = {
    [LocalesEnum.EN]: [],
    [LocalesEnum.UA]: [],
  };

  Object.entries(alphabets).forEach(([locale, alphabet]) => {
    Array.from(alphabet).forEach((_, i) => {
      results[locale as LocalesEnum].push({ key: i, value: caesar.decode(cipher, i, locale as LocalesEnum) });
    });
  });

  return results;
};
