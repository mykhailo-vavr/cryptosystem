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
