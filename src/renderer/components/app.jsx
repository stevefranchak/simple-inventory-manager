import React from 'react';
import connectDb from '../db.js';
import { hot } from 'react-hot-loader';

const { ipcRenderer } = require('electron');

class App extends React.Component {
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

export default hot(module)(App);
