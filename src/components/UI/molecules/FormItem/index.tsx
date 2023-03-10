import { FormItemProps } from 'antd';
import { FC } from 'react';
import { Wrapper } from './styles';

const FormItem: FC<FormItemProps> = (props) => <Wrapper {...props} />;

export default FormItem;
