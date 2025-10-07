import React from 'react';
import { createRoot } from 'react-dom/client'; // <-- make sure this is 'react-dom/client'
import './index.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // <-- create root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);