import { CipherForm } from '@/types';

export type RSAForm = {
  nValue: number;
  eValue: number;
  dValue: number;
} & CipherForm;
