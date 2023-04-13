import { size } from '@/utils/style';
import styled from 'styled-components';

export const MainLayoutWrapper = styled.section`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: ${size(24)} ${size(16)};
`;
