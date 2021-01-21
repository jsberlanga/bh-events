import * as React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { globalStyles } from 'styles';
import App from './App';

const GlobalStyle = createGlobalStyle`
  ${globalStyles};
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
