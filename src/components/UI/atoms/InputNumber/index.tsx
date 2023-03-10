import { InputNumber as AntInputNumber, InputNumberProps } from 'antd';
import { FC } from 'react';

const InputNumber: FC<InputNumberProps> = (props) => <AntInputNumber {...props} />;

export default InputNumber;
