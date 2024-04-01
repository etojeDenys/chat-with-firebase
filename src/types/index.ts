import firebase from 'firebase/compat';

export type User = {
  name: string;
  email: string;
  photoURL: string;
  date: number;
  uid: string;
  lastMessage?: string;
  nrOfUnreadMessages?: number;
  isOnline: boolean;
};

export type UserFirebase = firebase.User;
