import styledNormalize from 'styled-normalize';
import { injectGlobal } from 'styled-components';
import { colors } from './constants';

export default () => injectGlobal`
  ${styledNormalize}

  body {
    background-color: ${colors.DARKER_GRAY};
  }
`;
