import { List as AntList, ListProps } from 'antd';

const List = <T,>(props: ListProps<T>) => <AntList {...props} />;

export default List;
