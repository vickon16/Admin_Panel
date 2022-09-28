import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ModeContextProvider } from './context/ModeContext';
import "./index.css";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ModeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ModeContextProvider>
  </React.StrictMode>
);