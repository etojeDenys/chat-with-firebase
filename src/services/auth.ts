import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

import { auth, db, storage } from '../firebase';
import { UserRegister } from '../types/UserForm';

export async function registerUser(user: UserRegister) {
  const { email, name, password, profilePhoto } = user;
  const date = Date.now();

  const res = await createUserWithEmailAndPassword(auth, email, password);

  const storageRef = ref(storage, `${name + date}`);

  await uploadBytesResumable(storageRef, profilePhoto[0]);

  const downloadURL = await getDownloadURL(storageRef);
  await updateProfile(res.user, {
    displayName: name,
    photoURL: downloadURL
  });

  await setDoc(doc(db, 'users', res.user.uid), {
    uid: res.user.uid,
    name,
    email,
    photoURL: downloadURL
  });

  await setDoc(doc(db, 'userChats', res.user.uid), {});
}

export async function loginUser(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password);
}
