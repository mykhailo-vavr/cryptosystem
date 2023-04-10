import { FormItemProps as AntdFormItemProps } from 'antd';
import { Schema } from 'yup';

export type FormItemProps = { schema?: Schema } & AntdFormItemProps;
