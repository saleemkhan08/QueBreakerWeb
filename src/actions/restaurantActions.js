import { firestore } from "../store";

export const FETCH_RESTAURANTS = "FETCH_RESTAURANTS";
export const EDIT_RESTAURANTS = "EDIT_RESTAURANTS";
export const ADD_RESTAURANTS = "ADD_RESTAURANTS";
export const DELETE_RESTAURANTS = "DELETE_RESTAURANTS";
export const FETCH_RESTAURANTS_BEGIN = "FETCH_RESTAURANTS_BEGIN";
export const FETCH_RESTAURANTS_SUCCESS = "FETCH_RESTAURANTS_SUCCESS";
export const RESTAURANTS = "restaurants";
export function fetchRestaurants() {
  return dispatch => {
    dispatch(fetchRestaurantsBegin());
    const restaurantsRef = firestore.collection(RESTAURANTS);
    restaurantsRef.onSnapshot(querySnapshot => {
      const restaurants = [];
      querySnapshot.forEach(doc => {
        restaurants.push(doc.data());
      });
      console.log("Restaurants : ", restaurants);
      dispatch(fetchRestaurantsSuccess(restaurants));
    });
  };
}

export const fetchRestaurantsBegin = () => ({
  type: FETCH_RESTAURANTS_BEGIN
});

export const fetchRestaurantsSuccess = restaurants => ({
  type: FETCH_RESTAURANTS_SUCCESS,
  payload: { restaurants }
});
