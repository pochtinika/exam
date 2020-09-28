import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBRow } from "mdbreact";
import { Spinner, LaptopCard } from "../";
import { fetchLaptops } from "../../redux/actions/laptop";

import "./LaptopsList.scss";

const LaptopsList = () => {
	const dispatch = useDispatch();
	const { laptops, querySkip, sortBy, gridSize, loading } = useSelector((state) => state.laptop);
	const { resultBrands, resultCores, resultRAM, priceRange } = useSelector((state) => state.filter);
	const { darkmode } = useSelector((state) => state.user);

	const THEME = darkmode ? "darkmode" : "";

	const dispatchLaptops = useCallback(() => dispatch(fetchLaptops(querySkip, sortBy, resultBrands, priceRange, resultCores, resultRAM)), [
		dispatch,
		sortBy,
		querySkip,
		resultBrands,
		priceRange,
		resultCores,
		resultRAM,
	]);

	useEffect(() => {
		dispatchLaptops();
	}, [dispatchLaptops]);

	if (!laptops.length && !loading) return <div>Нет товаров, соответствующих критериям :(</div>;

	return (
		<MDBRow className={`laptops__list ${loading ? "laptops__list_loading" : ""}`}>
			{loading ? <Spinner /> : laptops.map((laptop) => <LaptopCard key={laptop._id} laptop={laptop} size={gridSize} THEME={THEME} />)}
		</MDBRow>
	);
};

export default LaptopsList;
