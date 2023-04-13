import { ActionsEnum, SaveAsEnum } from './settings';

export type CipherForm = {
  text: string;
  cipher: string;
  alphabet: string;
  action: ActionsEnum;
  saveAs: SaveAsEnum;
};

export type CipherFunction = (text: string, alphabet: string) => string;
