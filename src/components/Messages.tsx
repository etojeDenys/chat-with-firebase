import React, { useEffect, useState } from 'react';
import { Message } from '../types/Message';
import { useChatDetails } from '../context/ChatDetailsContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import classNames from 'classnames';
import { readMessages } from '../services/chats';

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const { currentUser } = useAuth();
  const { chatDetails } = useChatDetails();

  const selectedChatId = chatDetails?.selectedChatId || '';

  useEffect(() => {
    if (selectedChatId) {
      const unSub = onSnapshot(doc(db, 'chats', selectedChatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
    }
  }, [selectedChatId]);

  return (
    <div className="flex flex-col gap-2 overflow-y-scroll p-4">
      {messages.map((message) => {
        const isCurrentUser = message.senderId === currentUser?.uid;

        return (
          <div
            key={message.id}
            className={classNames('flex justify-start gap-2', {
              'ml-auto': isCurrentUser
            })}>
            <img
              className={classNames('h-10 w-10 rounded-full', {
                'order-last': isCurrentUser
              })}
              src={isCurrentUser ? currentUser?.photoURL! : chatDetails?.user?.photoURL!}
              alt="profile"
            />
            <div
              className={classNames(
                'rounded-lg bg-gray-300 p-3',
                isCurrentUser ? 'rounded-tr-none' : 'rounded-tl-none'
              )}>
              <p className="text-gray-800">{message.text}</p>
              <span className="text-xs text-gray-500">
                {new Date(message.date).toLocaleTimeString()}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
