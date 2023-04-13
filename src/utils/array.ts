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
