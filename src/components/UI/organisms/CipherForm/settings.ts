import { CipherForm, ActionsEnum, SaveAsEnum } from '@/types';

export const initialValues: CipherForm = {
  text: '',
  cipher: '',
  alphabet: 'abcdefghijklmnopqrstuvwxyz',
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
