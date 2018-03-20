import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/app';

const render = () => {
  ReactDOM.render(
    <AppContainer><App /></AppContainer>,
    document.getElementById('App'),
  );
};

render();
if (module.hot) {
  module.hot.accept(render);
}