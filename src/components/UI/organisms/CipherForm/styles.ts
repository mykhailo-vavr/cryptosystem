import { size } from '@/utils';
import styled from 'styled-components';

export const CipherFormWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    margin-bottom: ${size(10)};
  }

  .row {
    display: flex;
    gap: ${size(10)};
  }
`;
