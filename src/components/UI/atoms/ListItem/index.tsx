import { List } from 'antd';
import { ListItemProps } from 'antd/lib/list';
import { FC } from 'react';

const ListItem: FC<ListItemProps> = (props) => <List.Item {...props} />;

export default ListItem;
