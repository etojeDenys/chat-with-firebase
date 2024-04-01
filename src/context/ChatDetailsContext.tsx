import React, { useContext, useState } from 'react';
import { User } from '../types';

type ChatDetails = {
  user: User | null;
  selectedChatId: string;
};

type ChatDetailsContextType = {
  chatDetails: ChatDetails | null;
  changeChatDetails: (cd: ChatDetails) => void;
};

const initialValue = {
  chatDetails: null,
  changeChatDetails: () => {}
};

const ChatDetailsContext = React.createContext<ChatDetailsContextType>(initialValue);

export const ChatDetailsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chatDetails, setChatDetails] = useState<ChatDetails | null>(null);

  return (
    <ChatDetailsContext.Provider value={{ chatDetails, changeChatDetails: setChatDetails }}>
      {children}
    </ChatDetailsContext.Provider>
  );
};

export const useChatDetails = () => useContext(ChatDetailsContext);
