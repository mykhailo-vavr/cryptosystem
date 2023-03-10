import { FC } from 'react';
import { Form as AntForm, FormProps } from 'antd';

const Form: FC<FormProps> = (props) => <AntForm {...props} />;

export default Form;
