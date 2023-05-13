import { CipherForm } from '@/types';

export type KnapsackForm = {
  privateKey: string;
  publicKey: string;
  mValue: number;
  nValue: number;
} & CipherForm;
