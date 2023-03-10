import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { FC } from 'react';

const TextArea: FC<TextAreaProps> = (props) => <Input.TextArea {...props} />;

export default TextArea;
