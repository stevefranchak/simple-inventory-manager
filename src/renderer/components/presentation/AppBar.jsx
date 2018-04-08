import styled from 'styled-components';
import { colors } from '../../styles/constants';

const AppBar = styled.header`
  height: 4rem;
  background-color: ${colors.CHARCOAL};
  color: ${colors.WHITE};
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  user-select: none;
`;

export default AppBar;
