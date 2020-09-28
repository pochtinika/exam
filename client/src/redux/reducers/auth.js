import { AUTH_LOADING, AUTH_SIGNUP, AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR } from "../actions/actionTypes";

const initialState = {
	token: null,
	loading: false,
	error: false,
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case AUTH_LOADING:
			return { ...state, loading: true, error: false };

		case AUTH_SIGNUP:
			return { ...state, loading: false };

		case AUTH_LOGIN:
			return { ...state, loading: false, token: action.token };

		case AUTH_ERROR:
			return { ...state, error: true, loading: false };

		case AUTH_LOGOUT:
			return { ...state, token: null };
		default:
			return state;
	}
}
