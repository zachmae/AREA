import React from 'react';
import ReactDOM from 'react-dom/client';
import  { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);