jsx
import React, { useState, useContext, createContext, useEffect } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './components/Login/Login.js';
import Payment from './components/Payment/Payment.js';
import Search from './components/Search/Search.js';

const AuthContext = createContext();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem('authToken'));
  });

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <nav role="navigation" style={{ padding: '1rem', backgroundColor: '#f8f9fa' }}>
          <Link to="/" style={{ margin: '0 1rem' }}>Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/search" style={{ margin: '0 1rem' }}>Search</Link>
              <Link to="/payment" style={{ margin: '0 1rem' }}>Payment</Link>
              <button onClick={logout} style={{ margin: '0 1rem' }}>Logout</button>
            </>
          ) : (
            <Link to="/login" style={{ margin: '0 1rem' }}>Login</Link>
          )}
        </nav>
        
        <main style={{ flex: '1', padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<PublicRoute><Login onLoginSuccess={login} /></PublicRoute>} />
            <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          </Routes>
        </main>

        <footer style={{ padding: '1rem', backgroundColor: '#f8f9fa', textAlign: 'center' }}>
          &copy; 2024 shopping_website App. All rights reserved
        </footer>
      </div>
    </AuthContext.Provider>
  );
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Navigate to="/search" /> : children;
};

const Home = () => <div>Welcome to the shopping website!</div>;

export default App;
