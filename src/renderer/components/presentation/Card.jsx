import styled from 'styled-components';
import { colors } from '../../styles/constants';

const Card = styled.header`
  margin: 2rem;
  background-color: ${colors.WHITE};
  border: 0.1rem solid ${colors.DARKER_GRAY};
  font-size: 1.4rem;
  border-radius: 0.4rem;
  box-shadow: -2px 2px 5px ${colors.SHADOW_SHADE};
  padding: 0.8rem;
`;

export default Card;
