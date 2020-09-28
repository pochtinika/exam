import {
	LAPTOP_CHANGE_SKIP,
	LAPTOP_CHANGE_SORT,
	LAPTOP_CHANGE_GRID_SIZE,
	LAPTOP_LOADING,
	LAPTOP_FETCH,
	LAPTOP_FETCH_ONE,
	LAPTOP_ERROR,
	LAPTOP_SUCCESS,
} from "../actions/actionTypes";
import { request } from "../requestConfig";
import { toastMessage } from "./messager";

export function fetchLaptops(skip, sortBy = null, brands = [], priceRange = [], cores = [], ram = []) {
	return async (dispatch) => {
		dispatch(laptopLoading());

		let sortQuery = "";
		let brandsQuery = "";
		let priceQuery = "";
		let coresQuery = "";
		let ramQuery = "";

		if (sortBy) {
			sortQuery += `&sortBy=${sortBy.field}:${sortBy.order}`;
		}

		if (brands.length) {
			brandsQuery += `&brand=${brands.toString()}`;
		}

		if (priceRange.length) {
			priceQuery += `&price=${priceRange.toString()}`;
		}

		if (cores.length) {
			coresQuery += `&cores=${cores.toString()}`;
		}

		if (ram.length) {
			ramQuery += `&ram=${ram.toString()}`;
		}

		try {
			const { laptops, allLaptopsCount } = await request(
				`/api/laptops?skip=${skip}${sortQuery}${brandsQuery}${priceQuery}${coresQuery}${ramQuery}`
			);

			dispatch(laptopFetch(laptops, allLaptopsCount));
		} catch (error) {
			dispatch(laptopError());
			dispatch(toastMessage(error.message));
		}
	};
}

export function fetchOneLaptop(id) {
	return async (dispatch) => {
		dispatch(laptopLoading());

		try {
			const data = await request(`/api/laptops/${id}`);

			dispatch(laptopFetchOne(data));
		} catch (error) {
			dispatch(laptopError());
			dispatch(toastMessage(error.message));
		}
	};
}

export function deleteLaptop(id) {
	return async (dispatch) => {
		dispatch(laptopLoading());

		try {
			const { message } = await request(`/api/laptops/delete/${id}`, null, "DELETE");

			dispatch(laptopSuccess());
			dispatch(toastMessage(message));
		} catch (error) {
			dispatch(laptopError());
			dispatch(toastMessage(error.message));
		}
	};
}

export function addLaptop(laptop) {
	return async (dispatch) => {
		dispatch(laptopLoading());

		try {
			const laptopCopy = { ...laptop };
			laptopCopy.images = laptopCopy.images.trim().split(",");
			const { message } = await request(`/api/laptops/add`, laptopCopy, "POST");

			dispatch(laptopSuccess());
			dispatch(toastMessage(message));
		} catch (error) {
			dispatch(laptopError());
			dispatch(toastMessage(error.message));
		}
	};
}

export function laptopChangeGridSize(size) {
	return {
		type: LAPTOP_CHANGE_GRID_SIZE,
		size,
	};
}

export function laptopChangeQuerySkip(skip) {
	return {
		type: LAPTOP_CHANGE_SKIP,
		skip,
	};
}

export function laptopChangeQuerySort(sortBy) {
	return {
		type: LAPTOP_CHANGE_SORT,
		sortBy,
	};
}

export function laptopLoading() {
	return {
		type: LAPTOP_LOADING,
	};
}

export function laptopSuccess() {
	return {
		type: LAPTOP_SUCCESS,
	};
}

export function laptopError() {
	return {
		type: LAPTOP_ERROR,
	};
}

export function laptopFetch(laptops, allLaptopsCount) {
	return {
		type: LAPTOP_FETCH,
		laptops,
		allLaptopsCount,
	};
}

export function laptopFetchOne(laptop) {
	return {
		type: LAPTOP_FETCH_ONE,
		laptop,
	};
}
