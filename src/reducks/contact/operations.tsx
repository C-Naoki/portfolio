import { collection, doc, setDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'

import { FirebaseTimestamp, db } from '../../firebase'

import { addContactFailureAction, addContactSuccessAction } from './actions'

import type { AnyAction } from 'redux'
import type { ThunkDispatch } from 'redux-thunk'

const contactsRef = collection(db, 'contacts')

export const addNewContact = (
  surName: string,
  name: string,
  email: string,
  subject: string,
  message: string,
  t: (key: string) => string
) => {
  return async (dispatch: ThunkDispatch<any, null, AnyAction>) => {
    if (surName === '' || name === '' || email === '' || subject === '' || message === '') {
      toast.error(t('contact.empty-error'))
      return { success: false }
    }
    if (!validateEmail(email)) {
      toast.error(t('contact.email-error'))
      return { success: false }
    }

    const contactRef = doc(contactsRef)
    const uid = contactRef.id
    const newContact = {
      surName,
      name,
      email,
      subject,
      message,
      uid,
      written_at: FirebaseTimestamp.now()
    }

    try {
      await setDoc(contactRef, newContact)
      toast.success(t('contact.success'))
      dispatch(addContactSuccessAction(newContact))
      return { success: true }
    } catch (error: unknown) {
      toast.error(t('contact.error'))
      dispatch(addContactFailureAction(error))
      return { success: false, error }
    }
  }
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
