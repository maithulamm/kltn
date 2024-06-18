import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes'; // Import các route đã định nghĩa
import "primereact/resources/themes/lara-light-green/theme.css"
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import './App.css'
function App() {
  return (
    <Router>
      <Routes>
        {/* Các route không yêu cầu xác thực */}
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        
        {/* Các route yêu cầu xác thực */}
        {privateRoutes.map((route, index) => (
          <Route key={index} path={`admin${route.path}`} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
