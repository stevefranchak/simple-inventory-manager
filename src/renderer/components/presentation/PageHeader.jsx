import styled from 'styled-components';
import { spacing } from '../../styles/constants';

const PageHeader = styled.h1`
  font-size: 1.8rem;
  padding-left: calc(${spacing.PAGE_HEADER_HOR_PADDING} - ${spacing.APP_BAR_HOR_PADDING});
`;

export default PageHeader;
