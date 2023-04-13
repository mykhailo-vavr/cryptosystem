export const mod = (a: number, b: number) => {
  const c = a % b;
  return c < 0 ? c + b : c;
};

export const modInv = (a: number, m: number) => {
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }

  return -1;
};

export const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

export const isCoprime = (a: number, b: number) => gcd(a, b) === 1;

export const getCoprime = (num: number) => {
  for (let i = 2; i < num; i++) {
    if (gcd(num, i) === 1) {
      return i;
    }
  }

  return 1;
};

export const isSuperIncreasingSeq = (arr: number[]) => {
  if (!arr) {
    return false;
  }

  let sum = 0;

  return arr.every((num) => {
    if (sum >= num) {
      return false;
    }

    sum += num;
    return true;
  });
};
