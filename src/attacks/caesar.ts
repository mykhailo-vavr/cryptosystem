import caesar from '@/ciphers/caesar';
import { AttackResultsType } from '@/types';

export default (cipher: string, alphabet: string) => {
  const results: AttackResultsType = [];

  Array.from(alphabet).forEach((_, i) => {
    results.push({ key: i, value: caesar.decode(cipher, i, alphabet) });
  });

  return results;
};
