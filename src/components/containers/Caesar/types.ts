import { LocalesEnum, ActionsEnum, SaveAsEnum } from '@/utils';

export type CipherForm = {
  text: string;
  cipher: string;
  key: string | number;
  locale: LocalesEnum;
  action: ActionsEnum;
  saveAs: SaveAsEnum;
};
