import { combineReducers } from 'redux';
import authReducer from './authReducer';
import spotifyReducer from './spotifyReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  spotify: spotifyReducer
});

export default rootReducer;