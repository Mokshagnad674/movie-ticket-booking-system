// @ts-nocheck
import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './store/actions';

import theme from './theme';
import { Alert } from './components';
import Routes from './Routes';

import './assets/scss/index.scss';
import 'typeface-montserrat';
import { CssBaseline } from '@material-ui/core';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App error:', error, errorInfo);
  }

  componentDidMount() {
    try {
      store.dispatch(loadUser());
    } catch (error) {
      console.error('Error loading user:', error);
    }
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Something went wrong.</h2>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Alert />
          <Routes />
          
        </ThemeProvider>
      </Provider>
    );
  }
}
export default App;
