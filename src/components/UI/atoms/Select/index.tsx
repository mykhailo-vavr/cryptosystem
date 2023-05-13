import { Select as AntSelect, SelectProps } from 'antd';
import { FC } from 'react';

const Select: FC<SelectProps> = (props) => <AntSelect {...props} />;

export default Select;
