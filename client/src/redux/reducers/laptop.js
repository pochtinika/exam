import {
	LAPTOP_LOADING,
	LAPTOP_FETCH,
	LAPTOP_FETCH_ONE,
	LAPTOP_CHANGE_GRID_SIZE,
	LAPTOP_CHANGE_SORT,
	LAPTOP_CHANGE_SKIP,
	LAPTOP_SUCCESS,
	LAPTOP_ERROR,
} from "../actions/actionTypes";

const initialState = {
	laptops: [],
	allLaptopsCount: 0,
	querySkip: 0,
	sortBy: null,
	gridSize: "big",
	laptopDetails: null,
	loading: false,
	error: false,
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case LAPTOP_FETCH_ONE:
			return { ...state, loading: false, error: false, laptopDetails: action.laptop };

		case LAPTOP_CHANGE_SKIP:
			return { ...state, querySkip: action.skip };

		case LAPTOP_CHANGE_SORT:
			return { ...state, sortBy: action.sortBy };

		case LAPTOP_CHANGE_GRID_SIZE:
			return { ...state, gridSize: action.size };

		case LAPTOP_FETCH:
			return { ...state, loading: false, laptops: action.laptops, allLaptopsCount: action.allLaptopsCount, error: false };

		case LAPTOP_LOADING:
			return { ...state, loading: true, error: false };

		case LAPTOP_SUCCESS:
			return { ...state, loading: false, error: false };

		case LAPTOP_ERROR:
			return { ...state, loading: false, error: true };

		default:
			return state;
	}
}
