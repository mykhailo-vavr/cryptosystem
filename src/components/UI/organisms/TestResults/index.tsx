import { FC } from 'react';
import { List } from '@/components/UI/molecules';
import { ListItem } from '@/components/UI/atoms';
import { Props } from './types';

const TestResults: FC<Props> = ({ results }) => (
  <List
    header={<h3>Test results</h3>}
    footer={<div>Number of tests: {results.length}</div>}
    dataSource={results}
    renderItem={(result, i) => (
      <ListItem>
        Test {i + 1}: {result ? 'Passed' : 'Failed'}
      </ListItem>
    )}
  />
);

export default TestResults;
