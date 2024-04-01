import React, { ReactNode } from 'react';
import Register from './pages/Register';
import { Navigate, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';
import Loader from './components/Loader';

function App() {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Routes>
        {currentUser ? (
          <Route path="/" element={<Homepage />} />
        ) : (
          <Route path="/" element={<Navigate to="/login" />} />
        )}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
