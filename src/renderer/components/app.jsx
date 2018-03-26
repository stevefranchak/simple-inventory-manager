import React from 'react';
import connectDb from '../db.js';

const { ipcRenderer } = require('electron');

export default class App extends React.Component {
  async componentDidMount() {
    ipcRenderer.send('show');
    await connectDb();
  }

  render() {
    return (
      <div>
        <h2>Welcome to React!</h2>
      </div>
    );
  }
}
