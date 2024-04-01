import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ChatDetailsProvider } from './context/ChatDetailsContext';

const Root: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ChatDetailsProvider>
          <App />
        </ChatDetailsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Root;
