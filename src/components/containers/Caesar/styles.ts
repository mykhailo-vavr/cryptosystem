import { size } from '@/utils/style';
import styled from 'styled-components';

export const Title = styled.h2`
  margin-bottom: ${size(10)};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .row {
    display: flex;
    gap: ${size(10)};
  }
`;
