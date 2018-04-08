import styledNormalize from 'styled-normalize';
import { injectGlobal } from 'styled-components';
import { colors } from './constants';

export default () => injectGlobal`
  @import url('../node_modules/roboto-fontface/css/roboto-condensed/roboto-condensed-fontface.css');

  ${styledNormalize}

  html {
    font-family: 'Roboto', sans-serif;
    font-size: 62.5%; /* So that 1rem = 10px */
  }

  body {
    background-color: ${colors.DARKER_GRAY};
    font-size: 1.6rem;
    line-height: 1.5;
  }
`;
