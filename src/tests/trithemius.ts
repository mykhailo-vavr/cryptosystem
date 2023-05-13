import { alphabet } from '@/settings';
import assert from 'assert';
import { trithemius } from '@/ciphers';
import { TestFunction } from '@/types';

const linearCases = [
  {
    text: '',
    coefA: 7,
    coefB: 6,
    cipher: '',
  },
  {
    text: 'abcd',
    coefA: 5,
    coefB: 10,
    cipher: 'kpuz',
  },
  {
    text: 'somebody told me',
    coefA: 1,
    coefB: 1,
    cipher: 'tpnfcpez upme nf',
  },
  {
    text: 'The quick brown fox jumps over 13 lazy dogs.',
    coefA: 5,
    coefB: 10,
    cipher: 'Bte mgyui prcqx jcv dgshw cler 13 nkfa zcow.',
  },
  {
    text: 'The citys name is said to derive from the name of Kyi, one of its four legendary founders. During its history, Kyiv, one of the oldest cities in Eastern Europe, passed through several stages of prominence and obscurity. The city probably existed as a commercial center as early as the 5th century.',
    coefA: 15,
    coefB: 10,
    cipher:
      'Jls oajgu xkis au ukad jm dsfans hfmi jls xkis mh Ega, mxs mh aju hmyf tswsxdkfg hmyxdsfu. Dyfaxw aju laujmfg, Egan, mxs mh jls mtdsuj oajasu ax Skujsfx Syfmbs, bkuusd jlfmywl usnsfkt ujkwsu mh bfmiaxsxos kxd mzuoyfajg. Jls oajg bfmzkztg sraujsd ku k omiisfoakt osxjsf ku skftg ku jls 5jl osxjyfg.',
  },
];

const nonlinearCases = [
  {
    text: '',
    coefA: 7,
    coefB: 6,
    coefC: 6,
    cipher: '',
  },
  {
    text: 'abcd',
    coefA: 1,
    coefB: 1,
    coefC: 1,
    cipher: 'bdhn',
  },
  {
    text: 'somebody told me',
    coefA: 1,
    coefB: 1,
    coefC: 1,
    cipher: 'fdbvddnd rddn bv',
  },
  {
    text: 'The quick brown fox jumps over 13 lazy dogs.',
    coefA: 3,
    coefB: 0,
    coefC: 14,
    cipher: 'Ffk csyac rxekb lep xseny elkx 13 nora pesy.',
  },
  {
    text: 'The citys name is said to derive from the name of Kyi, one of its four legendary founders. During its history, Kyiv, one of the oldest cities in Eastern Europe, passed through several stages of prominence and obscurity. The city probably existed as a commercial center as early as the 5th century.',
    coefA: 10,
    coefB: 15,
    coefC: 20,
    cipher:
      'Prg mapeu hucg au uuaz pg zgtang htgc prg hucg gh Aea, ghg gh apu hget rgcghzute hgehzgtu. Zetahc apu raupgte, Aean, ghg gh prg grzgup mapagu ah Guupgth Getgzg, zuuugz prtgecr ugngtur upucgu gh ztgcahghmg uhz gtumetape. Prg mape ztgtutre gnaupgz uu u mgccgtmaur mghpgt uu gutre uu prg 5pr mghpete.',
  },
];

const testLinearEncoding = ({ text, coefA, coefB, cipher }: (typeof linearCases)[0]) => {
  try {
    assert.strictEqual(trithemius.encode.linear(text, coefA, coefB, alphabet), cipher);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const testLinearDecoding = ({ text, coefA, coefB, cipher }: (typeof linearCases)[0]) => {
  try {
    assert.strictEqual(trithemius.decode.linear(cipher, coefA, coefB, alphabet), text);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const testNonlinearEncoding = ({ text, coefA, coefB, coefC, cipher }: (typeof nonlinearCases)[0]) => {
  try {
    assert.strictEqual(trithemius.encode.nonlinear(text, coefA, coefB, coefC, alphabet), cipher);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const testNonlinearDecoding = ({ text, coefA, coefB, coefC, cipher }: (typeof nonlinearCases)[0]) => {
  try {
    assert.strictEqual(trithemius.decode.nonlinear(cipher, coefA, coefB, coefC, alphabet), text);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const testTrithemius: TestFunction = () => {
  const encodingResults = [...linearCases.map(testLinearEncoding), ...nonlinearCases.map(testNonlinearEncoding)];
  const decodingResults = [...linearCases.map(testLinearDecoding), ...nonlinearCases.map(testNonlinearDecoding)];

  return { encodingResults, decodingResults };
};

export default testTrithemius;
