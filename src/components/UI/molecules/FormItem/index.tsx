import { yupSync } from '@/utils';
import { FC } from 'react';
import { FormItemWrapper } from './styles';
import { FormItemProps } from './types';

const FormItem: FC<FormItemProps> = ({ schema, name, required, ...props }) => (
  <FormItemWrapper
    rules={schema && name ? yupSync(String(name), schema, required) : undefined}
    name={name}
    {...props}
  />
);

export default FormItem;
