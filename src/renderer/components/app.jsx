import { hot } from 'react-hot-loader';
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import connectDb from '../db.js';
import InventoryList from './container/InventoryList';
import InventoryItemDetails from './container/InventoryItemDetails';
import InventoryItemModifier from './container/InventoryItemModifier';
import BaseStyles from '../styles';

const { ipcRenderer } = require('electron');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      databaseHandle: null,
    };
  }

  async componentDidMount() {
    ipcRenderer.send('show');
    const databaseHandle = await connectDb();
    this.setState({
      databaseHandle,
    }, () => {
      console.log(this.state);
    });
  }

  render() {
    return (
      <div>
        {BaseStyles() /* allows style changes to hot reload */}
        Database is {this.state.databaseHandle ? 'Connected' : 'Not Connected'} <br />
        <Switch>
          <Redirect exact path="/" to="/inventory" />
          <Route exact path="/inventory" component={InventoryList} />
          <Route path="/inventory/add" component={InventoryItemModifier} />
          <Route exact path="/inventory/:id" component={InventoryItemDetails} />
          <Route path="/inventory/:id/edit" component={InventoryItemModifier} />
        </Switch>
      </div>
    );
  }
}

export default hot(module)(App);
