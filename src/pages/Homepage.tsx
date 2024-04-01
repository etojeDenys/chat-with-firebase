import React, { useEffect, useLayoutEffect } from 'react';
import CurrentUserInfo from '../components/CurrentUserInfo';
import ChatsList from '../components/ChatsList';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import ChatWindow from '../components/ChatWindow';
import UsersList from '../components/UsersList';
import { changeStatus } from '../services/users';
import { useAuth } from '../context/AuthContext';

const Homepage: React.FC = () => {
  const { currentUser } = useAuth();

  useLayoutEffect(() => {
    changeStatus(currentUser!.uid, true);

    const changeStatusToOffline = () => {
      changeStatus(currentUser!.uid, false);
    };

    window.addEventListener('beforeunload', changeStatusToOffline);

    return () => {
      changeStatusToOffline();
      window.removeEventListener('beforeunload', changeStatusToOffline);
    };
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-[30%]">
        <CurrentUserInfo />
        <ChatsList />
        <UsersList />
      </div>
      <div className="border-gray grow border-l py-5">
        <ChatWindow />
      </div>
    </div>
  );
};

export default Homepage;
