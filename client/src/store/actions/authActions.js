import { LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_SUCCESS, REGISTER_FAILURE, LOGOUT } from '../actionTypes';
import { auth } from '../../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const serializeUser = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
});

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const token = await userCredential.user.getIdToken();
    dispatch({ 
      type: LOGIN_SUCCESS, 
      payload: { 
        user: serializeUser(userCredential.user),
        token
      } 
    });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export const loginWithGoogle = () => async (dispatch) => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();
    dispatch({ 
      type: LOGIN_SUCCESS, 
      payload: { 
        user: serializeUser(result.user),
        token
      } 
    });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export const registerUser = (email, password) => async (dispatch) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const token = await userCredential.user.getIdToken();
    dispatch({ 
      type: REGISTER_SUCCESS, 
      payload: { 
        user: serializeUser(userCredential.user),
        token
      } 
    });
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
  }
};

export const logoutUser = () => async (dispatch) => {
  await auth.signOut();
  dispatch({ type: LOGOUT });
};