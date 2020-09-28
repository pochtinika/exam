import { CART_ADD_SUCCESS, CART_BUY_SUCCESS, CART_REMOVE_SUCCESS, CART_ERROR, CART_LOADING, CART_FETCH_SUCCESS } from "../actions/actionTypes";

const initialState = {
	itemsCount: 0,
	items: [],
	loading: false,
	error: false,
};

export default function authReducer(state = initialState, action) {
	let items, itemsCount;
	switch (action.type) {
		case CART_BUY_SUCCESS:
			return { ...state, itemsCount: 0, items: [], loading: false, error: false };

		case CART_ADD_SUCCESS:
			itemsCount = state.itemsCount;
			itemsCount += 1;
			items = [...state.items];
			items.push(action.item);
			return { ...state, itemsCount, items, loading: false, error: false };

		case CART_REMOVE_SUCCESS:
			itemsCount = state.itemsCount;
			itemsCount -= 1;
			items = [...state.items];
			const index = items.findIndex((item) => item._id === action.itemId);
			items.splice(index, 1);
			return { ...state, itemsCount, items, loading: false, error: false };

		case CART_FETCH_SUCCESS:
			return { ...state, items: action.items, itemsCount: action.items.length, loading: false, error: false };

		case CART_LOADING:
			return { ...state, loading: true, error: false };

		case CART_ERROR:
			return { ...state, error: true, loading: false };

		default:
			return state;
	}
}
