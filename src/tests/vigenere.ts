import { vigenere } from '@/ciphers';
import { alphabet } from '@/settings';
import { TestFunction } from '@/types';
import assert from 'assert';

const cases = [
  {
    text: '',
    motto: '',
    cipher: '',
  },
  {
    text: 'capybara is the best',
    motto: 'zoo',
    cipher: 'bodxpoqo wr hvd psrh',
  },
  {
    text: 'The quick brown fox jumps over 13 lazy dogs.',
    motto: 'crypto',
    cipher: 'Vyc fnweb zghkp wmm ciogq dost 13 cyor rqxq.',
  },
  {
    text: 'The citys name is said to derive from the name of Kyi, one of its four legendary founders. During its history, Kyiv, one of the oldest cities in Eastern Europe, passed through several stages of prominence and obscurity. The city probably existed as a commercial center as early as the 5th century.',
    motto: 'city',
    cipher:
      'Vpx akbrq pifc ka lykl mm fmkgxm ypqu mfg vtkg wy Iaq, hlg wy gva ymwz ecimgbczr dqcgbgzl. Bwzbli qmq jqlrqzr, Iaqo, mpm hd vpx mnlxqv kbrkml gp Mtqvmkl Gckmrm, iyuaxb vpkmwoa qgdxpct lrcoxq qn ipqublgvvc cvw mdavstqmw. Vpx akbr ntwuydtr czqlrgl tq c khkomkakie agvmct il cczew ca mfg 5ba agvmstg.',
  },
  { text: '123456789-.:', motto: 'chars', cipher: '123456789-.:' },
];

const testEncoding = ({ text, motto, cipher }: (typeof cases)[0]) => {
  try {
    assert.strictEqual(vigenere.encode(text, motto, alphabet), cipher);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const testDecoding = ({ text, motto, cipher }: (typeof cases)[0]) => {
  try {
    assert.strictEqual(vigenere.decode(cipher, motto, alphabet), text);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const testVigenere: TestFunction = () => ({
  encodingResults: cases.map((item) => testEncoding(item)),
  decodingResults: cases.map((item) => testDecoding(item)),
});

export default testVigenere;
