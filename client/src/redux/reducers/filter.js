import { FILTER_TOGGLE_BRAND, FILTER_TOGGLE_CORE, FILTER_TOGGLE_RAM, FILTER_APPLY, FILTER_RESET } from "../actions/actionTypes";

const initialState = {
	allBrands: [
		"Apple",
		"Acer",
		"Asus",
		"Dell",
		"Digma",
		"Honor",
		"HP",
		"Huawei",
		"Lenovo",
		"Microsoft",
		"MSI",
		"Prestigo",
		"Razer",
		"Samsung",
		"Sony",
		"Toshiba",
		"Xiaomi",
		"AlienWare",
		"Fujitsu",
		"Haier",
		"Hasee",
		"Mainbenben",
		"Thunderobot",
	],
	filterBrands: [],
	resultBrands: [],
	allCores: ["2 ядра", "4 ядра", "6 ядер", "8 ядер"],
	filterCores: [],
	resultCores: [],
	allRAM: ["4 Гб", "8 Гб", "16 Гб", "32 Гб", "64 Гб"],
	filterRAM: [],
	resultRAM: [],
	priceRange: [],
};

export default function filterReducer(state = initialState, action) {
	switch (action.type) {
		case FILTER_APPLY:
			return {
				...state,
				resultBrands: state.filterBrands,
				resultCores: state.filterCores,
				resultRAM: state.filterRAM,
				priceRange: action.priceRange,
			};

		case FILTER_RESET:
			return { ...state, resultBrands: [], filterBrands: [], resultCores: [], filterCores: [], resultRAM: [], filterRAM: [], priceRange: [] };

		case FILTER_TOGGLE_RAM:
			return { ...state, filterRAM: action.ram };

		case FILTER_TOGGLE_BRAND:
			return { ...state, filterBrands: action.brands };

		case FILTER_TOGGLE_CORE:
			return { ...state, filterCores: action.cores };

		default:
			return state;
	}
}
