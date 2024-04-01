import React, { useEffect } from 'react';
import { User } from '../types';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const CurrentUserInfo: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex items-center justify-between px-5 pb-5 pt-5">
      <div className="flex items-center gap-3">
        <img src={currentUser?.photoURL!} alt="profile" className="h-8 w-8 rounded-full" />
        <h2 className="bold">{currentUser?.displayName}</h2>
      </div>
      <button onClick={() => signOut(auth)}>Sign Out</button>
    </div>
  );
};

export default CurrentUserInfo;
