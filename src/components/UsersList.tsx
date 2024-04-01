import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from '../types';
import { useChatDetails } from '../context/ChatDetailsContext';
import classNames from 'classnames';
import { getUsers } from '../services/users';
import { addChat } from '../services/chats';

const ChatsList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const { currentUser } = useAuth();
  const { changeChatDetails, chatDetails } = useChatDetails();

  const uid = currentUser!.uid;

  useEffect(() => {
    getUsers(uid).then(setUsers);
  }, [uid]);

  const handleSelect = async (user: any) => {
    if (!currentUser) return;

    addChat(currentUser, user).then((chatId) => {
      changeChatDetails({
        user,
        selectedChatId: chatId
      });
    });
  };

  return (
    <div className="border-gray border-t">
      <div className="flex justify-center bg-gray-300 py-1 font-bold text-white">Users</div>
      {users.map((user) => (
        <div
          onClick={() => handleSelect(user)}
          key={user.uid}
          className={classNames(
            'flex cursor-pointer items-center gap-2 px-4 py-3 transition duration-300 ease-in-out hover:bg-gray-100',
            {
              'bg-gray-100': chatDetails?.user?.uid === user.uid
            }
          )}>
          <img src={user.photoURL} alt="photoURL" className="h-12 w-12 rounded-full object-cover" />
          <div>
            <h3 className="text-base font-semibold">{user.name}</h3>
            <span className="text-sm text-gray-500">{user.date}</span>
            {user.isOnline && <span className="font-thin text-blue-500">Online</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatsList;
