import { SET_SPOTIFY_TOKENS } from '../actionTypes';

const initialState = {
  accessToken: null,
  refreshToken: null,
  expiresIn: null
};

export default function spotifyReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SPOTIFY_TOKENS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        expiresIn: action.payload.expiresIn
      };
    default:
      return state;
  }
}