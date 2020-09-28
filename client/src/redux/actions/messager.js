import { CLEAR_MESSAGE, TOAST_MESSAGE } from "../actions/actionTypes";

export function toastMessage(message, delay = false) {
	return (dispatch) => {
		dispatch(setMessage(message));

		delay ? dispatch(autoClearMessage()) : dispatch(clearMessage());
	};
}

export function autoClearMessage() {
	return (dispatch) => {
		setTimeout(() => dispatch(clearMessage()), 4000);
	};
}

export function clearMessage() {
	return {
		type: CLEAR_MESSAGE,
	};
}

export function setMessage(message) {
	return {
		type: TOAST_MESSAGE,
		payload: message,
	};
}
