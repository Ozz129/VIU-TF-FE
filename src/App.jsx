import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import Dashboard from './pages/dashboard';
import { ApiKeyProvider } from './context/apiKey.context';
import Crop from './pages/crop';

function App() {
  return (
      <Router>
        <Routes>
          {/* Ruta por defecto que redirige a /login */}
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<ApiKeyProvider><Dashboard /></ApiKeyProvider>} />
          <Route path="/crop" element={<ApiKeyProvider><Crop /></ApiKeyProvider>} />

          {/* Puedes agregar más rutas aquí */}
        </Routes>
      </Router>
  );
}

export default App;
