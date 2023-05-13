import { FC } from 'react';
import { FormProps } from './types';
import { FormWrapper } from './styles';

const Form: FC<FormProps> = (props) => <FormWrapper {...props} />;

export default Form;
