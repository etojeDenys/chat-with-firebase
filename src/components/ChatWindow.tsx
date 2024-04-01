import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useChatDetails } from '../context/ChatDetailsContext';
import Messages from './Messages';
import Loader from './Loader';
import { addMessage } from '../services/chats';

const ChatWindow: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useAuth();
  const { chatDetails } = useChatDetails();

  const selectedChatId = chatDetails?.selectedChatId || '';
  const user = chatDetails?.user || null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    addMessage(selectedChatId, currentUser!.uid, user!.uid, message.trim(), 1).then(() => {
      setMessage('');
      setIsLoading(false);
    });
  };

  if (!user) return null;

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="border-gray flex gap-2 border-b px-10 pb-5">
        <img src={user.photoURL} alt="" className="h-8 w-8 rounded-full" />
        {user.name}
      </div>

      <Messages />

      <div className="p-2">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            className={'border-gray w-full rounded-lg border px-2 py-2'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isLoading}
          />
          <div className="absolute bottom-0 right-2 top-0 w-6">{isLoading && <Loader />}</div>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
