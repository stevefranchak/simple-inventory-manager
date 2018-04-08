import React from 'react';
import Page from '../presentation/Page';
import AppBar from '../presentation/AppBar';
import PageHeader from '../presentation/PageHeader';

export default class InventoryList extends React.Component {
  render() {
    return (
      <Page>
        <AppBar>
          <PageHeader>Inventory</PageHeader>
        </AppBar>
      </Page>
    );
  }
}
