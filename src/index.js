import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // <-- Dòng này rất quan trọng
import App from './App'; // <-- Hoặc './App.jsx' tùy theo tên file của bạn

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);