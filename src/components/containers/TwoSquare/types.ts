import { TwoSquareVariant } from '@/ciphers';
import { CipherForm } from '@/types';

export type TwoSquareForm = {
  omitLetter: string;
  variant: TwoSquareVariant;
  keywordA: string;
  keywordB: string;
  matrixA: string;
  matrixB: string;
} & CipherForm;
