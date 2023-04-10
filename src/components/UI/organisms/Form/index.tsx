import { FC } from 'react';
import { Form as AntForm } from 'antd';
import { FormProps } from './types';

const Form: FC<FormProps> = (props) => <AntForm {...props} />;

export default Form;
