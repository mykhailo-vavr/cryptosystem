import { size } from '@/utils';
import { Form } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled(Form.Item)`
  margin-bottom: ${size(10)};

  .ant-form-item-label {
    font-weight: 600;
    padding-bottom: ${size(2)};
  }
`;
