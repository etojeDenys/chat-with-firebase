import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { User } from '../types';
import { useChatDetails } from '../context/ChatDetailsContext';
import classNames from 'classnames';
import { generateChatId } from '../utils/generateChatId';

const ChatsList: React.FC = () => {
  const [chats, setChats] = useState<User[]>([]);

  const { currentUser } = useAuth();
  const { chatDetails, changeChatDetails } = useChatDetails();
  const uid = currentUser!.uid;

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'userChats', uid), (doc) => {
      const res = doc.data();

      if (res) {
        const array = Object.entries(res)?.sort((a, b) => b[1].date - a[1].date);

        const data: User[] = array.map((col) => ({
          isOnline: false,
          name: col[1].userInfo.displayName,
          photoURL: col[1].userInfo.photoURL,
          uid: col[1].userInfo.uid,
          email: '',
          date: col[1].date?.nanoseconds || 0,
          lastMessage: col[1].lastMessage?.text || '',
          nrOfUnreadMessages: col[1].nrOfUnreadMessages || 0
        }));

        setChats(data);
      }
    });

    return unsub;
  }, [uid]);

  const handleSelect = async (user: any) => {
    if (!currentUser) return;

    const chatId = generateChatId(currentUser.uid, user.uid);

    changeChatDetails({
      user,
      selectedChatId: chatId
    });
  };

  return (
    <div className="border-gray border-t">
      <div className="flex justify-center bg-gray-300 py-1 font-bold text-white">Chats</div>
      {chats.map((chat) => (
        <div
          onClick={() => handleSelect(chat)}
          key={chat.uid}
          className={classNames(
            'flex cursor-pointer items-center justify-between gap-2 px-4 py-3 transition duration-300 ease-in-out hover:bg-gray-100',
            {
              'bg-gray-100': chatDetails?.user?.uid === chat.uid
            }
          )}>
          <div className="flex gap-2">
            <img
              src={chat.photoURL}
              alt="photoURL"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <h3 className="text-base font-semibold">{chat.name}</h3>
              <span className="text-sm text-gray-500">{chat.lastMessage}</span>
            </div>
          </div>
          {chat.nrOfUnreadMessages !== 0 && (
            <div className="flex h-full items-center justify-self-end rounded-full bg-darkBlue px-3 py-1 text-white">
              {chat.nrOfUnreadMessages}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatsList;
