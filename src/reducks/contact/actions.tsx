import type { ContactState } from '@/reducks/contact/types'

export const FETCH_CONTACT_ID = 'FETCH_CONTACT_ID'

export const fetchContactbyIdAction = (contact: ContactState): { type: string, payload: ContactState } => {
  return {
    type: 'FETCH_CONTACT_ID',
    payload: contact
  }
}

export const ADD_CONTACT_SUCCESS = 'ADD_CONTACT_SUCCESS'

export const addContactSuccessAction = (contact: ContactState): { type: string, payload: ContactState } => {
  return {
    type: ADD_CONTACT_SUCCESS,
    payload: contact
  }
}

export const ADD_CONTACT_FAILURE = 'ADD_CONTACT_FAILURE'

export const addContactFailureAction = (error: unknown): { type: string, payload: unknown } => {
  return {
    type: ADD_CONTACT_FAILURE,
    payload: error
  }
}
