import { FC } from 'react';
import { DescriptionsWrapper } from './styles';
import { DescriptionsProps } from './types';

const Descriptions: FC<DescriptionsProps> = (props) => <DescriptionsWrapper {...props} />;

export default Descriptions;
