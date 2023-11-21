import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ContactReducer } from '../contact/reducers';

const rootReducer = combineReducers({
  contact: ContactReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
