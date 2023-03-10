import { ActionsEnum, LocalesEnum, SaveAsEnum } from '@/utils';
import { CipherForm } from './types';

export const initialValues: CipherForm = {
  text: '',
  cipher: '',
  key: 0,
  locale: LocalesEnum.EN,
  action: ActionsEnum.ENCODE,
  saveAs: SaveAsEnum.TEXT,
};

export const actionOptions = [
  { value: ActionsEnum.ENCODE, label: 'Encode' },
  { value: ActionsEnum.DECODE, label: 'Decode' },
];

export const saveAsOptions = [
  { value: SaveAsEnum.TEXT, label: 'Plain text' },
  { value: SaveAsEnum.FILE, label: 'File' },
];

export const selectOptions = [
  { value: LocalesEnum.EN, label: 'EN' },
  { value: LocalesEnum.UA, label: 'UA' },
];
