import React, { useState, useMemo } from "react";
import { MDBPagination, MDBPageItem, MDBPageNav } from "mdbreact";

import "./Pagination.scss";

const Pagination = ({ arrayLength, skip, initialPage, onChangePage, THEME = "" }) => {
	const [activeItem, setActiveItem] = useState(initialPage);

	// Define how much pages we have
	const pagesLength = useMemo(() => Math.ceil(arrayLength / skip), [skip, arrayLength]);

	// Render pagination numbers
	const createPages = (pagesLength) => {
		const pages = new Array(pagesLength).fill(0);

		return pages.map((page, index) => (
			<MDBPageItem active={index === activeItem} key={index} onClick={() => changePageHandler(index)}>
				<MDBPageNav className="page-link">
					{index + 1} {index === activeItem ? <span className="sr-only">(текущая)</span> : null}
				</MDBPageNav>
			</MDBPageItem>
		));
	};

	// Changing active page
	const changePageHandler = (value) => {
		if (activeItem !== value) {
			setActiveItem(value);
			onChangePage(value * skip);
		}
	};

	return (
		<MDBPagination circle color="teal" className={`my-pagination ${THEME}`}>
			<MDBPageItem disabled={activeItem === 0}>
				<MDBPageNav className="page-link" aria-label="Previous" onClick={() => changePageHandler(activeItem - 1)}>
					<span aria-hidden="true">Назад</span>
					<span className="sr-only">Назад</span>
				</MDBPageNav>
			</MDBPageItem>
			{createPages(pagesLength)}
			<MDBPageItem disabled={activeItem === pagesLength - 1}>
				<MDBPageNav className="page-link" onClick={() => changePageHandler(activeItem + 1)}>
					Вперед
				</MDBPageNav>
			</MDBPageItem>
		</MDBPagination>
	);
};

export default Pagination;
