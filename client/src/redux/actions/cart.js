import {
	CART_ADD_SUCCESS,
	CART_BUY_SUCCESS,
	CART_REMOVE_SUCCESS,
	CART_LOADING,
	CART_ERROR,
	CART_FETCH_SUCCESS,
	UPDATE_PURCHASES,
} from "../actions/actionTypes";
import { request } from "../requestConfig";
import { toastMessage } from "./messager";

export function addItem(item) {
	return async (dispatch) => {
		dispatch(cartLoading());
		try {
			const { laptop, message } = await request("/api/cart/add", { id: item._id }, "POST");

			dispatch(cartAddSuccess(laptop));
			dispatch(toastMessage(message));
		} catch (error) {
			dispatch(toastMessage(error.message));
			dispatch(cartError());
		}
	};
}

export function removeItem(id) {
	return async (dispatch) => {
		dispatch(cartLoading());
		try {
			const { message } = await request("/api/cart/remove", { id }, "DELETE");

			dispatch(cartRemoveSuccess(id));
			dispatch(toastMessage(message));
		} catch (error) {
			dispatch(toastMessage(error.message));
			dispatch(cartError());
		}
	};
}

export function getCartItems() {
	return async (dispatch) => {
		dispatch(cartLoading());
		try {
			const { cart } = await request("/api/cart");

			dispatch(cartFetchSuccess(cart));
		} catch (error) {
			dispatch(cartError());
			dispatch(toastMessage(error.message));
		}
	};
}

export function buy() {
	return async (dispatch) => {
		dispatch(cartLoading());
		try {
			const { message, user } = await request("/api/cart/buy", null, "POST");

			dispatch(cartBuySuccess());
			dispatch(toastMessage(message));
			dispatch({ type: UPDATE_PURCHASES, purchasesNumber: user.purchasesNumber });
		} catch (error) {
			dispatch(cartError());
			dispatch(toastMessage(error.message));
		}
	};
}

export function cartError() {
	return {
		type: CART_ERROR,
	};
}

export function cartLoading() {
	return {
		type: CART_LOADING,
	};
}

export function cartAddSuccess(item) {
	return {
		type: CART_ADD_SUCCESS,
		item,
	};
}

export function cartBuySuccess() {
	return {
		type: CART_BUY_SUCCESS,
	};
}

export function cartRemoveSuccess(itemId) {
	return {
		type: CART_REMOVE_SUCCESS,
		itemId,
	};
}

export function cartFetchSuccess(items) {
	return {
		type: CART_FETCH_SUCCESS,
		items,
	};
}
