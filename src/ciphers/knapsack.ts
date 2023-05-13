import { mod, modInv, chunk } from '@/utils';

export default {
  encode: (byteCode: string, publicKey: number[]) => {
    const byteCodeChunks = chunk<string>(byteCode.split(''), publicKey.length);

    return byteCodeChunks.map((item) =>
      item.reduce((sum, num, i) => sum + +num * publicKey[mod(i, publicKey.length)], 0),
    );
  },

  decode: (sums: number[], mValue: number, nValue: number, privateKey: number[]) => {
    const sValue = modInv(nValue, mValue);

    const start = Date.now();
    return sums.map((sum) => {
      let divValue = mod(sum * sValue, mValue);
      const values = [];

      while (divValue > 0) {
        if (Date.now() > start + 1000 * 10) {
          break;
        }

        for (let i = privateKey.length - 1; i >= 0; i--) {
          if (privateKey[i] > divValue) {
            values.unshift(0);
            continue;
          }

          values.unshift(1);
          divValue -= privateKey[i];
        }
      }

      return values.slice(values.length - 7).join('');
    });
  },

  getPublicKey: (privateKey: number[], mValue: number, nValue: number) =>
    privateKey.map((num) => mod(nValue * num, mValue)),
};
