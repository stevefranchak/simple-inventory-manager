import styled from 'styled-components';
import tinycolor from 'tinycolor2';
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
  box-shadow: 1px 2px 5px 1px ${colors.SHADOW_SHADE};

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

  ${
    props => (
      props.isButton ? `
        cursor: pointer;

        &:hover {
          background-color: ${tinycolor(props.backgroundColor).darken(5)}
        }
      ` : ''
    )
  }
`;

export default Circle;
