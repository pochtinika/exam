import { FILTER_TOGGLE_BRAND, FILTER_TOGGLE_CORE, FILTER_TOGGLE_RAM, FILTER_APPLY, FILTER_RESET } from "../actions/actionTypes";

export function toggleCheckbox(filterItems, checkboxName, filterType) {
	return (dispatch) => {
		const items = [...filterItems];
		const index = items.findIndex((item) => item === checkboxName);

		if (index === -1) {
			items.push(checkboxName);
		} else {
			items.splice(index, 1);
		}

		switch (filterType) {
			case "brand":
				return dispatch(filterToggleBrand(items));
			case "core":
				return dispatch(filterToggleCore(items));
			case "ram":
				return dispatch(filterToggleRAM(items));
			default:
				return;
		}
	};
}

export function filterToggleBrand(brands) {
	return {
		type: FILTER_TOGGLE_BRAND,
		brands,
	};
}

export function filterToggleCore(cores) {
	return {
		type: FILTER_TOGGLE_CORE,
		cores,
	};
}

export function filterToggleRAM(ram) {
	return {
		type: FILTER_TOGGLE_RAM,
		ram,
	};
}

export function filterApply(priceRange) {
	return {
		type: FILTER_APPLY,
		priceRange,
	};
}

export function filterReset() {
	return {
		type: FILTER_RESET,
	};
}
