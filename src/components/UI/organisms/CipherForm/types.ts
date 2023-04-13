import { ReactNode } from 'react';
import { FormInstance } from 'antd';
import { AttackFunction, CipherForm, FieldData, TestFunction } from '@/types';

export type CipherFormProps = {
  children: ReactNode;
  title: string;
  form: FormInstance<CipherForm>;
  onChange: (changedFields: FieldData[]) => void;
  encode?: (text: string, alphabet: string) => string;
  decode?: (text: string, alphabet: string) => string;
  test: TestFunction;
  attack?: AttackFunction;
};
