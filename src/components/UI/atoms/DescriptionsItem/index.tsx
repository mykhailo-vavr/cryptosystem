import { FC } from 'react';
import { DescriptionsItemProps } from './types';
import { DescriptionItemWrapper } from './styles';

const DescriptionItem: FC<DescriptionsItemProps> = (props) => <DescriptionItemWrapper {...props} />;

export default DescriptionItem;
