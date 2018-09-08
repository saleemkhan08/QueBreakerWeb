import { LOGIN_USER, LOGOUT_USER, FETCH_USER } from "../actions/authActions";

const initialState = {
  isLoggedIn: false,
  isLoggingLoading: true,
  user: null
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isLoggedIn: true,
        isLoggingLoading: false,
        user: action.payload
      };

    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingLoading: false,
        user: null
      };
    case FETCH_USER:
      return {
        ...state,
        isLoggingLoading: true
      };
    default:
      return state;
  }
};

export default AuthReducer;
