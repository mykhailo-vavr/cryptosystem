import { getRandomNumber, getRandomPrimeNumber, isCoprime, lcm, modInv, modPow } from '@/utils';

const getE = (phiN: number) => {
  let e = getRandomNumber(2, phiN);

  while (!isCoprime(e, phiN)) {
    e = getRandomNumber(2, phiN);
  }

  return e;
};

export default {
  encode: (text: string, n: number, e: number) => {
    const encryptedMessage = [];

    for (let i = 0; i < text.length; i++) {
      const encryptedCharCode = modPow(text.charCodeAt(i), e, n);
      encryptedMessage.push(encryptedCharCode);
    }

    return encryptedMessage;
  },

  decode: (cipher: number[], n: number, d: number) => {
    let decryptedMessage = '';

    for (let i = 0; i < cipher.length; i++) {
      const decryptedCharCode = modPow(cipher[i], d, n);
      decryptedMessage += String.fromCharCode(decryptedCharCode);
    }

    return decryptedMessage;
  },

  getKeys: () => {
    const p = getRandomPrimeNumber();
    const q = getRandomPrimeNumber();

    const n = p * q;
    const phiN = lcm(p - 1, q - 1);

    const e = getE(phiN);

    const d = modInv(e, phiN);

    return {
      publicKey: {
        n,
        e,
      },
      privateKey: {
        n,
        d,
      },
    };
  },
};
