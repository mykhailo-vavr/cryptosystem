import { chunk, mod, modInvMatrix, multiplyMatrixByVector } from '@/utils';

export default {
  encode: (text: string, keyMatrix: number[][], alphabet: string) => {
    const transformedText = text
      .split('')
      .map((letter) => alphabet.indexOf(letter))
      .filter((value) => value !== -1);

    const chunks = chunk(transformedText, keyMatrix.length);

    return chunks
      .map((vector) =>
        multiplyMatrixByVector(keyMatrix, vector)
          .map((value) => mod(value, alphabet.length))
          .map((i) => alphabet[i])
          .join(''),
      )
      .join('');
  },

  decode: (text: string, keyMatrix: number[][], alphabet: string) => {
    const transformedText = text
      .split('')
      .map((letter) => alphabet.indexOf(letter))
      .filter((value) => value !== -1);

    const chunks = chunk(transformedText, keyMatrix.length);

    return chunks
      .map((vector) =>
        multiplyMatrixByVector(modInvMatrix(keyMatrix, alphabet.length), vector)
          .map((value) => mod(value, alphabet.length))
          .map((i) => alphabet[i])
          .join(''),
      )
      .join('');
  },
};
