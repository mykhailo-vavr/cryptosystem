import { FC } from 'react';
import { List } from '@/components/UI/molecules';
import { ListItem } from '@/components/UI/atoms';
import { Props } from './types';

const AttackResults: FC<Props> = ({ results }) => (
  <div>
    {...Object.entries(results).map(([locale, data]) => (
      <List
        key={locale}
        header={<h3>Attack results for {locale.toUpperCase()} locale</h3>}
        footer={<div>Number of variants: {data.length}</div>}
        dataSource={data}
        renderItem={({ key, value }) => (
          <ListItem>
            Key {key}: {value}
          </ListItem>
        )}
      />
    ))}
  </div>
);

export default AttackResults;
