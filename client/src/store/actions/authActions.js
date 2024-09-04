import { LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_SUCCESS, REGISTER_FAILURE, LOGOUT } from '../actionTypes';
import { auth } from '../../firebase';

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    dispatch({ type: LOGIN_SUCCESS, payload: userCredential.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export const registerUser = (email, password) => async (dispatch) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    dispatch({ type: REGISTER_SUCCESS, payload: userCredential.user });
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
  }
};

export const logoutUser = () => async (dispatch) => {
  await auth.signOut();
  dispatch({ type: LOGOUT });
};