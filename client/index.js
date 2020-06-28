import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { initialState } from './components/AppContextProvider'

ReactDOM.render(
  <React.StrictMode>
    <App initialState={initialState} />
  </React.StrictMode>,
  document.getElementById('root')
);
