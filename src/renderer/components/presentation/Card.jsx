import styled from 'styled-components';
import { colors } from '../../styles/constants';

const Card = styled.section`
  margin: 2rem;
  background-color: ${colors.WHITE};
  border: 0.1rem solid ${colors.DARKER_GRAY};
  font-size: 1.5rem;
  border-radius: 0.4rem;
  box-shadow: -2px 2px 5px ${colors.SHADOW_SHADE};
  padding: 1.6rem;
`;

export default Card;
