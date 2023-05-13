export const mod = (a: number, b: number) => {
  const c = a % b;
  return c < 0 ? c + b : c;
};

export const modInv = (a: number, m: number) => {
  for (let i = 1; i < m; i++) {
    if ((a * i) % m === 1) {
      return i;
    }
  }

  return -1;
};

export const modPow = (base: number, exponent: number, m: number) => {
  if (m === 1) {
    return 0;
  }

  let a = base % m;
  let e = exponent;
  let result = 1;

  while (e > 0) {
    if (e % 2 === 1) {
      result = (result * a) % m;
    }

    e = Math.floor(e / 2);
    a = (a * a) % m;
  }

  return result;
};

export const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

export const lcm = (a: number, b: number) => Math.abs(a * b) / gcd(a, b);

export const isPrime = (num: number) => {
  if (num === 2 || num === 3) {
    return true;
  }

  if (num <= 1 || num % 2 === 0 || num % 3 === 0) {
    return false;
  }

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) {
      return false;
    }
  }

  return true;
};

export const isCoprime = (a: number, b: number) => gcd(a, b) === 1;

export const getCoprime = (num: number) => {
  for (let i = 2; i < num; i++) {
    if (isCoprime(num, i)) {
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

export const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export const getRandomPrimeNumber = (min = 0, max = 100) => {
  let num = 1;

  while (!isPrime(num)) {
    num = getRandomNumber(min, max);
  }

  return num;
};
