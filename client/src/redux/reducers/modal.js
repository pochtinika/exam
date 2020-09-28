import { TOGGLE_MODAL } from "../actions/actionTypes";

const initialState = {
	isOpen: false,
};

export default function modalReducer(state = initialState, action) {
	switch (action.type) {
		case TOGGLE_MODAL:
			return { ...state, isOpen: !state.isOpen };

		default:
			return state;
	}
}
