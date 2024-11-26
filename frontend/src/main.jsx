import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {Provider} from 'react-redux';
import store from './store/store.js';
import { ThemeProvider } from '@emotion/react';
import { theme } from './themes/theme.js';
import './index.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
)
