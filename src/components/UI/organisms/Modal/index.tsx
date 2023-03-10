import { FC } from 'react';
import { Modal as AntModal, ModalProps } from 'antd';

const Modal: FC<ModalProps> = (props) => <AntModal {...props} />;

export default Modal;
