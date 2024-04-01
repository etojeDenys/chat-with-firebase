import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore';
import { db } from '../firebase';
import { User } from '../types';

export const getUsers = async (uid: string) => {
  const usersRef = collection(db, 'users');

  const q = query(usersRef, where('uid', 'not-in', [uid]));

  const querySnapshot = await getDocs(q);
  const arr: User[] = [];
  querySnapshot.forEach((doc) => {
    arr.push(doc.data() as User);
  });

  return arr;
};

export const changeStatus = async (uid: string, isOnline: boolean) => {
  await updateDoc(doc(db, 'users', uid), {
    isOnline: isOnline
  });
};
