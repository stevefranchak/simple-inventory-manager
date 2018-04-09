import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import Page from '../presentation/Page';
import AppBar from '../presentation/AppBar';
import PageHeader from '../presentation/PageHeader';
import Card from '../presentation/Card';
import CircleButton from './CircleButton';
import NoItemsParagraph from './NoItemsParagraph';
import { colors, spacing } from '../../styles/constants';

export default class InventoryList extends React.Component {
  render() {
    return (
      <Page>
        <AppBar>
          <PageHeader>Inventory</PageHeader>
        </AppBar>
        <Card>
          <NoItemsParagraph
            message="There are no inventory items in the system."
            buttonLabel="Add a New Item"
            buttonTo="/inventory/add"
          />
        </Card>
        <CircleButton
          linkTo="/inventory/add"
          mini
          backgroundColor={colors.BLUE}
          fixed
          right={spacing.APP_BAR_HOR_PADDING}
          bottom={spacing.APP_BAR_HOR_PADDING}
        >
          <FontAwesomeIcon icon={faPlus} />
        </CircleButton>
      </Page>
    );
  }
}
