import React from 'react';
import { Link } from 'react-router-dom';

export default class InventoryList extends React.Component {
  async componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div>
        InventoryList <br />
        <Link to="/">/</Link> <br />
        <Link to="/inventory">/inventory</Link> <br />
        <Link to="/inventory/add">/inventory/add</Link> <br />
        <Link to="/inventory/1">/inventory/1</Link> <br />
        <Link to="/inventory/1/edit">/inventory/1/edit</Link> <br />
      </div>
    );
  }
}
