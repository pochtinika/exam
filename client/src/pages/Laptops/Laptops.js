import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBContainer, MDBIcon } from "mdbreact";
import { laptopChangeQuerySkip, laptopChangeGridSize, laptopChangeQuerySort } from "../../redux/actions/laptop";
import { Pagination, Drawer, LaptopsList } from "../../components";
import { DropDown, SectionHeader } from "../../ui";

import "./Laptops.scss";

const Laptops = () => {
	const dispatch = useDispatch();
	const { allLaptopsCount, querySkip, sortBy, gridSize } = useSelector((state) => state.laptop);
	const { darkmode } = useSelector((state) => state.user);

	const THEME = darkmode ? "darkmode" : "";

	// Pagination between pages
	const onChangePage = (skip) => dispatch(laptopChangeQuerySkip(skip));

	// Sorting by price and date
	const sortByClickHandler = (item) => {
		if (sortBy && sortBy.label === item.label) {
			dispatch(laptopChangeQuerySort(null));
		} else {
			dispatch(laptopChangeQuerySort(item));
		}
	};

	// Changing grid size
	const onChangeGridSize = () => {
		gridSize === "big" ? dispatch(laptopChangeGridSize("small")) : dispatch(laptopChangeGridSize("big"));
	};

	// Sort options
	const sortItems = [
		{ label: "От дорогих к дешевым", field: "price", order: "desc" },
		{ label: "От дешевых к дорогим", field: "price", order: "asc" },
		{ label: "По дате(сначала новые)", field: "createdAt", order: "desc" },
		{ label: "По дате(сначала старые)", field: "createdAt", order: "asc" },
		{ label: "По рейтингу(убывание)", field: "rating", order: "desc" },
		{ label: "По рейтингу(возрастание)", field: "rating", order: "asc" },
	];

	return (
		<section className={`laptops section_page ${THEME}`}>
			<MDBContainer>
				<SectionHeader title="Ноутбуки" THEME={THEME} />

				<div className="laptops__display-mode d-flex align-items-center">
					<Drawer />
					<DropDown items={sortItems} active={sortBy} clickHandler={(item) => sortByClickHandler(item)} THEME={THEME} />
					<MDBIcon
						title="Большая плитка"
						icon="th-large"
						className={`d-none d-md-block laptops__mode-icon ${gridSize === "big" ? "laptops__mode-icon_active" : ""} ${THEME}`}
						onClick={onChangeGridSize.bind(null)}
					/>
					<MDBIcon
						title="Маленькая плитка"
						icon="th"
						className={`d-none d-md-block laptops__mode-icon ${gridSize === "small" ? "laptops__mode-icon_active" : ""} ${THEME}`}
						onClick={onChangeGridSize.bind(null)}
					/>
				</div>

				<LaptopsList />

				<Pagination
					skip={12}
					initialPage={querySkip > 0 ? querySkip / 12 : querySkip}
					arrayLength={allLaptopsCount}
					onChangePage={(page) => onChangePage(page)}
					THEME={THEME}
				/>
			</MDBContainer>
		</section>
	);
};

export default Laptops;
