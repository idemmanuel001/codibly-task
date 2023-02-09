import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import ContextProvider from './context/dataContext';


const myGlobalStyle = <GlobalStyles styles={{
  html: {
    height: '100vh',
    width: '100%'
  },
  body: {
    height: '100vh',
    width: '100%',
  }
}} />;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CssBaseline />
    {myGlobalStyle}
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);


