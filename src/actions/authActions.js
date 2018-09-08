import { firestore } from "../store";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const FETCH_USER = "FETCH_USER";

export function fetchUser(userId) {
  return dispatch => {
    console.log("fetchUser : ", userId);
    const usersRef = firestore.collection("users").doc(userId);
    usersRef
      .get()
      .then(docSnapshot => {
        console.log("docSnapshot : ", docSnapshot);
        const user = docSnapshot.data();
        console.log("users : ", user);
        dispatch(loginUser(user));
        return user;
      })
      .catch(error => dispatch(logoutUser()));
  };
}

export const loginUser = user => ({
  type: LOGIN_USER,
  payload: user
});

export const logoutUser = () => ({
  type: LOGOUT_USER
});
