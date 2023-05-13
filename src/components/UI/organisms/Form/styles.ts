import { size } from '@/utils';
import { Form } from 'antd';
import styled from 'styled-components';

export const FormWrapper = styled(Form)`
  .row {
    display: flex;
    gap: ${size(10)};
  }
`;
