import {
  ADD_RESTAURANTS,
  DELETE_RESTAURANTS,
  EDIT_RESTAURANTS,
  FETCH_RESTAURANTS_BEGIN,
  FETCH_RESTAURANTS_SUCCESS
} from "../actions/restaurantActions";

const initialState = {
  restaurants: [],
  isLoading: true,
  error: null,
  drawer: false
};

const RestaurantReducer = (state = initialState, action) => {
  console.log("action", action);
  switch (action.type) {
    case FETCH_RESTAURANTS_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case FETCH_RESTAURANTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        restaurants: action.payload
      };

    case EDIT_RESTAURANTS:
      return {
        ...state
      };

    case DELETE_RESTAURANTS:
      return {
        ...state
      };

    case ADD_RESTAURANTS:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default RestaurantReducer;
