import styled from 'styled-components';
import { colors, spacing } from '../../styles/constants';

const AppBar = styled.header`
  height: ${spacing.APP_BAR_HEIGHT};
  background-color: ${colors.CHARCOAL};
  color: ${colors.WHITE};
  display: flex;
  align-items: center;
  padding: 0 ${spacing.APP_BAR_HOR_PADDING};
  user-select: none;
  box-shadow: 0 2px 5px ${colors.SHADOW_SHADE};
  position: relative;
`;

export default AppBar;
