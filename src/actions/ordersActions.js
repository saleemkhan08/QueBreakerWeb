import { firestore } from "../store";
import { RESTAURANTS } from "./restaurantActions";
export const FETCH_ORDERS_BEGIN = "FETCH_ORDERS_BEGIN";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const ORDERS = "orders";
export const DATE = "date";

export function fetchOrders(restaurantId, date) {
  return dispatch => {
    dispatch(fetchOrdersBegin());
    const ordersRef = firestore
      .collection(RESTAURANTS)
      .doc(restaurantId)
      .collection(ORDERS);
    const query = ordersRef.where(DATE, "==", date);
    console.log("query", query);

    query.onSnapshot(querySnapshot => {
      console.log("querySnapshot", querySnapshot);
      const orders = [];
      querySnapshot.forEach(doc => {
        orders.push(doc.data());
      });
      console.log("Orders : ", orders);
      dispatch(fetchOrdersSuccess(orders));
    });
  };
}

export const fetchOrdersBegin = () => ({
  type: FETCH_ORDERS_BEGIN
});

export const fetchOrdersSuccess = orders => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: { orders }
});
