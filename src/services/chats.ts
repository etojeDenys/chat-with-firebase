import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  increment,
  updateDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { User, UserFirebase } from '../types';
import { generateChatId } from '../utils/generateChatId';

export const getChats = async (currentUserUid: string) => {
  return await onSnapshot(doc(db, 'userChats', currentUserUid), (doc) => {
    return doc.data();
  });
};

export const addChat = async (currentUser: UserFirebase, user: User) => {
  const chatId = generateChatId(currentUser.uid, user.uid);

  try {
    const res = await getDoc(doc(db, 'chats', chatId));

    if (!res.exists()) {
      // await setDoc(doc(db, 'userChats', uid), {
      //   [chatId + '.userInfo']: {
      //     uid: user.uid,
      //     displayName: user.displayName,
      //     photoURL: user.photoURL
      //   },
      //   [chatId + '.date']: serverTimestamp()
      // });

      await setDoc(doc(db, 'chats', chatId), { messages: [] });

      //create user chats
      await updateDoc(doc(db, 'userChats', currentUser.uid), {
        [chatId + '.userInfo']: {
          uid: user.uid,
          displayName: user.name,
          photoURL: user.photoURL
        },
        [chatId + '.date']: serverTimestamp()
      });

      await updateDoc(doc(db, 'userChats', user.uid), {
        [chatId + '.userInfo']: {
          uid: currentUser.uid,
          displayName: currentUser!.displayName,
          photoURL: currentUser!.photoURL
        },
        [chatId + '.date']: serverTimestamp()
      });
    }
  } catch (e) {}

  return chatId;
};

export const addMessage = async (
  selectedChatId: string,
  currentUid: string,
  userUid: string,
  message: string,
  nrOfUnreadMessages: number
) => {
  await updateDoc(doc(db, 'chats', selectedChatId), {
    messages: arrayUnion({
      id: Date.now(),
      text: message.trim(),
      senderId: currentUid,
      date: Date.now()
    })
  });

  await updateDoc(doc(db, 'userChats', currentUid), {
    [selectedChatId + '.lastMessage']: {
      text: message.trim()
    },
    [selectedChatId + '.date']: serverTimestamp()
  });

  await updateDoc(doc(db, 'userChats', userUid), {
    [selectedChatId + '.lastMessage']: {
      text: message.trim()
    },
    [selectedChatId + '.date']: serverTimestamp(),
    [selectedChatId + '.nrOfUnreadMessages']: increment(1)
  });
};

export const readMessages = async (chatId: string, uid: string) => {
  await updateDoc(doc(db, 'userChats', uid), {
    [chatId + '.nrOfUnreadMessages']: 0
  });

  return chatId;
};
