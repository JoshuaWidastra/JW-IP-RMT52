import { SET_SPOTIFY_TOKEN } from '../actionTypes';

const initialState = {
  token: null
};

export default function spotifyReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SPOTIFY_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
}