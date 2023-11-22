import { collection, doc, setDoc } from "firebase/firestore";
import toast from 'react-hot-toast';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { FirebaseTimestamp, db } from '../../firebase';
import { addContactFailureAction, addContactSuccessAction } from './actions';

const contactsRef = collection(db, "contacts");

export const addNewContact = (
  surName: string,
  name: string,
  email: string,
  subject: string,
  message: string
) => {
  return async (dispatch: ThunkDispatch<any, null, AnyAction>) => {
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

    await setDoc(contactRef, newContact).then(() => {
      toast.success('送信しました');
      dispatch(addContactSuccessAction(newContact));
    }).catch((error) => {
      toast.error('送信に失敗しました');
      dispatch(addContactFailureAction(error));
    });
  };
};
