import { DescriptionsItem } from '@/components/UI/atoms';
import { Descriptions } from '@/components/UI/molecules';
import { FC } from 'react';

const Info: FC = () => (
  <Descriptions title="Info">
    <DescriptionsItem label="Full name">Mykhailo Vavrykovych</DescriptionsItem>
    <DescriptionsItem label="Group">AMI-33</DescriptionsItem>
  </Descriptions>
);

export default Info;
