import { Descriptions } from 'antd';
import { FC } from 'react';

const Info: FC = () => (
  <Descriptions title="Info">
    <Descriptions.Item label="Full name">Mykhailo Vavrykovych</Descriptions.Item>
    <Descriptions.Item label="Group">AMI-33</Descriptions.Item>
  </Descriptions>
);

export default Info;
