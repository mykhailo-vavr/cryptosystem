/* eslint-disable no-param-reassign */
import { modInv } from './math';

export const seqToNumArr = (seq: string, separator = ',') => seq.split(separator).map(Number);

export const arrSum = (arr: number[]) => arr.reduce((sum, num) => sum + num, 0);

export const chunk = <T>(arr: T[], size: number) => {
  if (size < 1) {
    return [arr.slice()];
  }

  const res = [];

  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }

  return res;
};

export const arrCharToBinary = () => {};

export const removeDuplicates = (value: string | string[]) => Array.from(new Set(value));

export const getDifference = (arr1: string[], arr2: string[]) => arr1.filter((value) => !arr2.includes(value));

export const formatMatrix = <T>(matrix: T[][], delimiter = `\t`) => {
  const str = matrix.reduce((prev, row) => `${prev}${row.join(delimiter)}\n`, '');

  return str;
};

export const findInMatrix = <T>(matrix: T[][], value: T): [number, number] => {
  let pos: [number, number] = [-1, -1];

  matrix.forEach((row, i) => {
    const j = row.findIndex((cell) => cell === value);

    if (j > -1) {
      pos = [i, j];
    }
  });

  return pos;
};

export const getOnlyLettersArray = (text: string) => text.replace(/[^a-z]+/gi, '').split('');

export const multiplyMatrixByVector = (matrix: number[][], vector: number[]) => {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  if (numCols !== vector.length) {
    return [];
  }

  const result: number[] = [];

  for (let i = 0; i < numRows; i++) {
    let sum = 0;
    for (let j = 0; j < numCols; j++) {
      sum += matrix[i][j] * vector[j];
    }
    result.push(sum);
  }

  return result;
};

export function calculateModDeterminant(matrix: number[][], n: number, mod = 0): number {
  let det = 0;

  if (n === 2) {
    return (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]) % mod;
  }

  const submatrix: number[][] = new Array(n - 1).fill(0).map(() => new Array<number>(n - 1).fill(0));

  for (let x = 0; x < n; x++) {
    let subi = 0;
    for (let i = 1; i < n; i++) {
      let subj = 0;
      for (let j = 0; j < n; j++) {
        if (j === x) {
          continue;
        }
        submatrix[subi][subj] = matrix[i][j];
        subj++;
      }
      subi++;
    }
    const recDet = calculateModDeterminant(submatrix, n - 1, mod);
    det = (det + matrix[0][x] * (x % 2 === 0 ? 1 : -1) * recDet) % mod;
  }

  return (det + mod) % mod;
}

const adjugate = (matrix: number[][], adj: number[][], n: number, mod: number) => {
  if (n === 1) {
    adj[0][0] = 1;
    return;
  }

  let sign = 1;
  const submatrix: number[][] = new Array(n - 1).fill(0).map(() => new Array<number>(n - 1).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let subi = 0;

      for (let ii = 0; ii < n; ii++) {
        if (ii === i) {
          continue;
        }

        let subj = 0;

        for (let jj = 0; jj < n; jj++) {
          if (jj === j) {
            continue;
          }

          submatrix[subi][subj] = matrix[ii][jj];
          subj++;
        }

        subi++;
      }

      adj[j][i] = (sign * calculateModDeterminant(submatrix, n - 1, mod)) % mod;
      sign = -sign;
    }
  }
};

export const modInvMatrix = (matrix: number[][], mod: number) => {
  const n = matrix.length;
  const adj: number[][] = new Array(n).fill(0).map(() => new Array<number>(n).fill(0));
  const det = calculateModDeterminant(matrix, n, mod);

  if (det === 0) {
    throw new Error('Non-invertible matrix');
  }

  const detInv = modInv(det, mod);
  adjugate(matrix, adj, n, mod);

  const inv: number[][] = new Array(n).fill(0).map(() => new Array<number>(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      inv[i][j] = (adj[i][j] * detInv) % mod;
    }
  }

  return inv;
};

export const isMatrixInvertible = (matrix: number[][]) => calculateModDeterminant(matrix, matrix.length);
