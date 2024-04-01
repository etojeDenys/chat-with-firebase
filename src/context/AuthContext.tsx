import React, { useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { User, UserFirebase } from '../types';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  isLoading: boolean;
  currentUser: UserFirebase | null;
};

const initialValue = {
  isLoading: true,
  currentUser: null
};

const AuthContext = React.createContext<AuthContextType>(initialValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserFirebase | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user as UserFirebase);
      setIsLoading(false);

      if (user) {
        navigate('/');
      }
    });

    return unSubscribe;
  }, []);

  return <AuthContext.Provider value={{ currentUser, isLoading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
