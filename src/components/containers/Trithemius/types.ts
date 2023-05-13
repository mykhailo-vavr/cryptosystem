import { CipherForm } from '@/types';

export enum KeyTypeEnum {
  LINEAR = 'linear',
  NONLINEAR = 'nonlinear',
}

export type TrithemiusForm = {
  keyType: KeyTypeEnum;
  coefA: number;
  coefB: number;
  coefC?: number;
} & CipherForm;
