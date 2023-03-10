import caesar from '@/ciphers/caesar';
import { Locale } from '@/utils/types';
import assert from 'assert';

const cases = [
  {
    text: '',
    key: 0,
    cipher: '',
  },
  {
    text: 'aaaa',
    key: 0,
    cipher: 'aaaa',
  },
  {
    text: 'hello world',
    key: 1,
    cipher: 'ifmmpaxpsme',
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea',
    key: 16,
    cipher:
      'Ldgubpyehjbptdadgphyipqbui,psdchusiuijgpqtyeyhsycwpuayi,phutptdpuyjhbdtpiubedgpycsytytjcipjipaqrdgupuiptdadgupbqwcqpqayfjq.pUipucybpqtpbycybpkucyqb,pfjyhpcdhigjtpumugsyiqiydcpjaaqbsdpaqrdgyhpcyhypjipqayfjyepumpuq',
  },
  { text: 'Це текст українською', key: 16, cipher: 'Цтлґтьгґлдьвмш гїьай', locale: 'ua' },
];

export const testEncoding = ({ text, key, cipher, locale = 'en' }: (typeof cases)[0]) => {
  try {
    assert.strictEqual(caesar.encode(text, key, locale as Locale), cipher);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const testDecoding = ({ text, key, cipher, locale }: (typeof cases)[0]) => {
  try {
    assert.strictEqual(caesar.decode(cipher, key, locale as Locale), text);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const test = () => {
  const encodingResults = cases.map((item) => testEncoding(item));
  const decodingResults = cases.map((item) => testDecoding(item));

  return { encodingResults, decodingResults };
};
