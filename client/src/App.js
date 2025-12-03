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
        <div style={{ padding: '20px', textAlign: 'center', background: 'white', color: 'black', minHeight: '100vh' }}>
          <h2>Something went wrong.</h2>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }

    try {
      return (
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div style={{ minHeight: '100vh', background: '#1a1a2e' }}>
              <Alert />
              <Routes />
            </div>
          </ThemeProvider>
        </Provider>
      );
    } catch (error) {
      console.error('Render error:', error);
      return (
        <div style={{ padding: '20px', textAlign: 'center', background: 'white', color: 'black', minHeight: '100vh' }}>
          <h2>🎬 Movie Ticket Booking</h2>
          <p>Loading application...</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }
  }
}
export default App;
