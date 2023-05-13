import { FC } from 'react';
import { Radio as AntRadio, RadioGroupProps } from 'antd';

const RadioGroup: FC<RadioGroupProps> = (props) => <AntRadio.Group {...props} />;

export default RadioGroup;
