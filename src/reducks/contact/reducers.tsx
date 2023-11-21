import * as Actions from './actions';
import initialState from '../store/initialState';
import { Action } from './types';


export const ContactReducer = (state = initialState.contact, action: Action) => {
  switch (action.type) {
    case Actions.FETCH_CONTACT_ID:
      return {
        ...state,
        favorite: [...action.payload],
      }
    default:
      return state;
  }
}
