import {
	CHANGE_DARKMODE,
	UPDATE_NAME,
	UPDATE_EMAIL,
	UPDATE_MAILING,
	UPDATE_INFO,
	USER_ERROR,
	USER_LOADING,
	GET_USERS_SUCCESS,
	UPDATE_ROLE,
	USER_CHANGE_SKIP,
	CHANGE_SEARCH_BY_EMAIL,
} from "./actionTypes";
import { request } from "../requestConfig";
import { prettifyName } from "../../utils/prettifyName";
import { toastMessage } from "./messager";

// Receiving Data from server when app initialized
export function getUserData() {
	return async (dispatch) => {
		dispatch(userLoading());
		try {
			const data = await request("/api/user/me");
			const userInfo = { ...data };

			if (userInfo.name) {
				userInfo.name = prettifyName(userInfo.name);
			}
			if (!userInfo.recieveEmails) {
				userInfo.recieveEmails = false;
			}

			dispatch(updateUser(userInfo));
		} catch (error) {
			dispatch(userError());
			dispatch(toastMessage(error.message));
		}
	};
}

// Get all users for Role page
export function getUsers(skip, email) {
	return async (dispatch) => {
		dispatch(userLoading());
		try {
			const { users, allUsersCount } = await request(`/api/user/users?skip=${skip}&email=${email}`);

			dispatch(getUsersSuccess(users, allUsersCount));
		} catch (error) {
			dispatch(userError());
			dispatch(toastMessage(error.message));
		}
	};
}

// Change user role
export function changeRole(id, value) {
	return async (dispatch) => {
		dispatch(userLoading());
		try {
			const role = value ? "admin" : "user";
			const { message } = await request(`/api/user?id=${id}`, { role }, "PATCH");

			dispatch(updateRole(id, role));
			dispatch(toastMessage(message));
		} catch (error) {
			dispatch(userError());
			dispatch(toastMessage(error.message));
		}
	};
}

// Change search by email value
export function changeSearchByEmail(value) {
	return {
		type: CHANGE_SEARCH_BY_EMAIL,
		value,
	};
}

// Send request to update name and email
export function updateInfo(name, email) {
	return async (dispatch) => {
		dispatch(userLoading());
		try {
			const { user, message } = await request("/api/user/me/info", { name, email }, "PATCH");
			user.name = prettifyName(user.name);
			localStorage.setItem("userName", user.name);

			dispatch(updateUser(user));
			dispatch(toastMessage(message));
		} catch (error) {
			dispatch(userError());
			dispatch(toastMessage(error.message));
		}
	};
}

// Sending request to server to change mailing option
export function changeMailing(value) {
	return async (dispatch) => {
		try {
			const { message } = await request("/api/user/me/mailing", { recieveEmails: value }, "PATCH");

			dispatch({ type: UPDATE_MAILING, recieveEmails: value });
			dispatch(toastMessage(message));
		} catch (error) {
			dispatch(userError());
			dispatch(toastMessage(error.message));
		}
	};
}

function updateUser(userInfo) {
	return {
		type: UPDATE_INFO,
		userInfo,
	};
}

export function changeDarkMode(value) {
	return (dispatch) => {
		localStorage.setItem("darkmode", value);

		dispatch({ type: CHANGE_DARKMODE, darkmode: value });
	};
}

export function changeName(name) {
	return (dispatch) => {
		dispatch({ type: UPDATE_NAME, name });
	};
}

export function changeEmail(email) {
	return (dispatch) => {
		dispatch({ type: UPDATE_EMAIL, email });
	};
}

export function userError() {
	return {
		type: USER_ERROR,
	};
}

export function userChangeQuerySkip(skip) {
	return {
		type: USER_CHANGE_SKIP,
		skip,
	};
}

function updateRole(id, role) {
	return {
		type: UPDATE_ROLE,
		id,
		role,
	};
}

function userLoading() {
	return {
		type: USER_LOADING,
	};
}

export function getUsersSuccess(users, allUsersCount) {
	return {
		type: GET_USERS_SUCCESS,
		users,
		allUsersCount,
	};
}
