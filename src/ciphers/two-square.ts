import { chunk, findInMatrix, getOnlyLettersArray } from '@/utils';

export enum TwoSquareVariant {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

const helper = (text: string, matrixA: string[][], matrixB: string[][], variant: TwoSquareVariant) => {
  const arr = getOnlyLettersArray(text);
  const digraphs = chunk(arr, 2);

  return digraphs
    .map(([a, b]) => {
      if (!b) {
        return a;
      }

      const leftPos = findInMatrix(matrixA, a);
      const rightPos = findInMatrix(matrixB, b);

      let leftEncrypted = '';
      let rightEncrypted = '';

      if (variant === TwoSquareVariant.HORIZONTAL) {
        leftEncrypted = matrixA[rightPos[0]][leftPos[1]];
        rightEncrypted = matrixB[leftPos[0]][rightPos[1]];
      }

      if (variant === TwoSquareVariant.VERTICAL) {
        leftEncrypted = matrixA[leftPos[0]][rightPos[1]];
        rightEncrypted = matrixB[rightPos[0]][leftPos[1]];
      }

      return leftEncrypted + rightEncrypted;
    })
    .join(' ');
};

export default {
  encode: (text: string, matrixA: string[][], matrixB: string[][], variant: TwoSquareVariant) =>
    helper(text, matrixA, matrixB, variant),
  decode: (text: string, matrixA: string[][], matrixB: string[][], variant: TwoSquareVariant) =>
    helper(text, matrixA, matrixB, variant),
};
