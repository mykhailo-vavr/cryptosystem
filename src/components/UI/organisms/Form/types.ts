import { ReactNode } from 'react';
import { FormProps as AntdFormProps } from 'antd';

export type FormProps = {
  children?: ReactNode;
} & AntdFormProps;
