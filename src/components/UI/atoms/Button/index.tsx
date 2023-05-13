import { Button as AntButton, ButtonProps } from 'antd';
import { FC } from 'react';

const Button: FC<ButtonProps> = (props) => <AntButton {...props} />;

export default Button;
