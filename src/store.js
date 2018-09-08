import { createStore, applyMiddleware, combineReducers } from "redux";
import RestaurantReducer from "./reducers/restaurantReducer";
import AuthReducer from "./reducers/authReducer";
import OrderReducer from "./reducers/orderReducer";
//import logger from "redux-logger";
import thunk from "redux-thunk";
import firebase from "firebase/app";
import "firebase/firestore/dist/index.cjs";

export const store = createStore(
  combineReducers({ AuthReducer, RestaurantReducer, OrderReducer }),
  applyMiddleware(thunk)
);

export const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);
