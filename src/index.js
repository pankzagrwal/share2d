import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import configureStore from './store';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import reportWebVitals from './reportWebVitals';

import { green, deepPurple } from '@material-ui/core/colors';

const outerTheme = createMuiTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'Roboto',
    ].join(','),
  },
  palette: {
    primary: {
          main: deepPurple[500],
        },
        secondary: {
          main: green[500],
        },
  },
});

ReactDOM.render(
  <Provider store={configureStore()}>
    <React.StrictMode>
      <CssBaseline />
      <ThemeProvider theme={outerTheme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
