import React from 'react';

const { ipcRenderer } = require('electron');

export default class App extends React.Component {
  componentDidMount() {
    ipcRenderer.send('show');
  }

  render() {
    return (
      <div>
        <h2>Welcome to React!</h2>
      </div>
    );
  }
}
