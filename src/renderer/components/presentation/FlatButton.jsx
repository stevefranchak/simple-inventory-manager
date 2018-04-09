import styled from 'styled-components';
import { colors } from '../../styles/constants';

const FlatButton = styled.button`
  height: 3.6rem;
  text-transform: uppercase;
  text-align: center;
  min-width: 8rem;
  border-radius: 0.2rem;
  border: none;
  color: ${props => props.color || colors.BLUE};
  background-color: ${props => props.backgroundColor || colors.WHITE};
  padding: 0;
  margin: 0.8rem 0;

  &:focus {
    outline: none;
  }
`;

export default FlatButton;
