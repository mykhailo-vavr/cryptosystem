import { FC } from 'react';
import { List } from '@/components/UI/molecules';
import { ListItem } from '@/components/UI/atoms';
import { Props } from './types';

const AttackResults: FC<Props> = ({ results }) => (
  <div>
    <List
      footer={<div>Number of variants: {results.length}</div>}
      dataSource={results}
      renderItem={({ key, value }) => (
        <ListItem>
          Key {key}: {value}
        </ListItem>
      )}
    />
  </div>
);

export default AttackResults;
