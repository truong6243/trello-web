import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfirmProvider } from "material-ui-confirm";
import { store } from '~/redux/store.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ConfirmProvider>
            <App />
            <ToastContainer />
          </ConfirmProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
