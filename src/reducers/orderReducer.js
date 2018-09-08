import {
  FETCH_ORDERS_BEGIN,
  FETCH_ORDERS_SUCCESS
} from "../actions/ordersActions";

const initialState = {
  orders: [],
  isLoading: true,
  error: null
};

const OrderReducer = (state = initialState, action) => {
  console.log("action", action);
  switch (action.type) {
    case FETCH_ORDERS_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: action.payload.orders
      };
    default:
      return state;
  }
};

export default OrderReducer;
