import type { Dispatch } from 'redux';
import { collection, doc, setDoc } from "firebase/firestore";
import toast from 'react-hot-toast';
import { db, FirebaseTimestamp } from '../../firebase';
import { addContactSuccessAction, addContactFailureAction } from './actions';

const contactsRef = collection(db, "contacts");

export const addNewContact = (surName: string, name: string, email: string, subject: string, message: string) => {
  return async (dispatch: Dispatch) => {
    if (surName === '' || name === '' || email === '' || subject === '' || message === '') {
      toast.error('必須項目が未入力です');
      return;
    }

    const contactRef = doc(contactsRef);
    const uid = contactRef.id;
    const newContact = {
      surName,
      name,
      email,
      subject,
      message,
      uid: uid,
      written_at: FirebaseTimestamp.now(),
    };

    try {
      await setDoc(contactRef, newContact);
      toast.success('送信しました');
      dispatch(addContactSuccessAction(newContact));
    } catch (error) {
      toast.error('送信に失敗しました');
      dispatch(addContactFailureAction(error));
    }
  };
};
