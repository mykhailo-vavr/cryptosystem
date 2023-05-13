import { FC, useMemo } from 'react';
import { List } from '@/components/UI/molecules';
import { ListItem } from '@/components/UI/atoms';
import { Props } from './types';

const FrequencyTable: FC<Props> = ({ text }) => {
  const frequencyTable = useMemo(
    () =>
      Array.from(text).reduce(
        (hashTable: Record<string, number>, char) => ({
          ...hashTable,
          [char]: hashTable[char] ? hashTable[char] + 1 : 1,
        }),
        {},
      ),
    [text],
  );

  return (
    <List
      header={<h3>Frequency table</h3>}
      footer={<div>Characters count: {text.length}</div>}
      dataSource={Object.entries(frequencyTable)}
      renderItem={([char, count]) => (
        <ListItem>
          &quot;{char}&quot; : {count}
        </ListItem>
      )}
    />
  );
};

export default FrequencyTable;
