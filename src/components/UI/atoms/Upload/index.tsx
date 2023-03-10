import { Upload as AntUpload, UploadProps } from 'antd';
import { FC } from 'react';

const Upload: FC<UploadProps> = (props) => <AntUpload {...props} />;

export default Upload;
