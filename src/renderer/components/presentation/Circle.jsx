import styled from 'styled-components';
import { colors } from '../../styles/constants';

const Circle = styled.div`
  height: ${props => (props.mini ? '4rem' : '5.6rem')};
  width: ${props => (props.mini ? '4rem' : '5.6rem')};
  background-color: ${props => props.backgroundColor};
  color: ${props => (props.color || colors.WHITE)};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${
    props => (
      (props.absolute || props.fixed) ? `
        position: ${props.absolute ? 'absolute' : 'fixed'};
        ${typeof props.top !== 'undefined' ? `top: ${props.top};` : ''}
        ${typeof props.right !== 'undefined' ? `right: ${props.right};` : ''}
        ${typeof props.bottom !== 'undefined' ? `bottom: ${props.bottom};` : ''}
        ${typeof props.left !== 'undefined' ? `left: ${props.left};` : ''}
      ` : ''
    )
  }
`;

export default Circle;
