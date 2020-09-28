import { AUTH_LOADING, AUTH_SIGNUP, AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, CHANGE_DARKMODE } from "./actionTypes";
import { request } from "../requestConfig";
import { prettifyName } from "../../utils/prettifyName";
import { toastMessage, clearMessage } from "./messager";

export function auth(email, password, isLogin) {
	return async (dispatch) => {
		dispatch(authLoading());
		dispatch(clearMessage());

		try {
			if (isLogin) {
				const { user, token, message, expiresIn } = await request("/api/auth/login", { email, password }, "POST", false);

				localStorage.setItem("token", token);
				localStorage.setItem("expirationDate", expiresIn);

				if (user.name) {
					const userName = prettifyName(user.name);
					localStorage.setItem("userName", userName);
				}

				dispatch(authLogin(token));
				dispatch(toastMessage(message));
			} else {
				const { message } = await request("/api/auth/signup", { email, password }, "POST", false);

				dispatch(authSignup());
				dispatch(toastMessage(message, true));
			}
		} catch (error) {
			dispatch(authError());
			dispatch(toastMessage(error.message, true));
		}
	};
}

export function logout(message = "") {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem("token");
			let logoutMessage = "";

			if (token) {
				const data = await request("/api/auth/logout", null, "POST");
				logoutMessage = data.message;
			}

			localStorage.removeItem("token");
			localStorage.removeItem("userName");
			localStorage.removeItem("expirationDate");

			dispatch({ type: AUTH_LOGOUT });

			dispatch(toastMessage(message || logoutMessage, true));
		} catch (e) {
			dispatch(authError());
			dispatch(toastMessage(e.message));
		}
	};
}

export function autoLogin() {
	return async (dispatch) => {
		const token = localStorage.getItem("token");

		if (localStorage.getItem("darkmode")) {
			const darkmode = JSON.parse(localStorage.getItem("darkmode"));
			dispatch({ type: CHANGE_DARKMODE, darkmode });
		}

		if (token) {
			try {
				await request("/api/auth/check");

				const expirationDate = new Date(localStorage.getItem("expirationDate") * 1000);

				if (expirationDate <= new Date()) {
					dispatch(logout());
				} else {
					const userName = localStorage.getItem("userName") || "";
					dispatch(authLogin(token));
					dispatch(toastMessage(`Здравствуйте ${userName}, Вы вошли в систему! ✌🏻😎`));
					dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
				}
			} catch (e) {
				dispatch({ type: AUTH_LOGOUT });

				localStorage.removeItem("token");
				localStorage.removeItem("userName");
				localStorage.removeItem("expirationDate");

				dispatch(authError());
				dispatch(toastMessage("Время сессии истекло!", true));
			}
		}
	};
}

export function authLoading() {
	return {
		type: AUTH_LOADING,
	};
}

export function authError() {
	return {
		type: AUTH_ERROR,
	};
}

export function authLogin(token) {
	return {
		type: AUTH_LOGIN,
		token,
	};
}

export function authSignup() {
	return {
		type: AUTH_SIGNUP,
	};
}

export function autoLogout(time) {
	return async (dispatch) => {
		// Выходим из системы если токен не актуальный
		// за одну минуту  до истечения токена, чтобы можно было выполнить запрос на сервер для logout, когда мы еще авторизованы
		setTimeout(() => dispatch(logout("Вреия сессии истекло")), time * 1000 - 60000);
	};
}
