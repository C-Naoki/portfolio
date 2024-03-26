import initialState from '../store/initialState'

import * as Actions from './actions'

import type { Action } from './types'

export const ContactReducer = (state = initialState.contact, action: Action): any => {
  switch (action.type) {
    case Actions.FETCH_CONTACT_ID:
      return {
        ...state,
        contact: [...action.payload]
      }
    default:
      return state
  }
}
