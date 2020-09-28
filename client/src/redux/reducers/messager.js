import { CLEAR_MESSAGE, TOAST_MESSAGE } from "../actions/actionTypes";

const initialState = {
	message: "",
};

export default function messagerReducer(state = initialState, action) {
	switch (action.type) {
		case TOAST_MESSAGE:
			return { ...state, message: action.payload };

		case CLEAR_MESSAGE:
			return { ...state, message: "" };

		default:
			return state;
	}
}
