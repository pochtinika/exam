import React, { useState } from "react";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

import "./DropDown.scss";

const DropDown = ({ items, clickHandler, active, THEME = "" }) => {
	const [activeItem, setActiveItem] = useState(active);

	// If current sort Option is enabled => disable this option
	const onClickHandler = (item) => {
		if (activeItem && activeItem.label === item.label) {
			setActiveItem(null);
		} else {
			setActiveItem(item);
		}

		clickHandler(item);
	};

	// Render Dropdown Options
	const generateItems = (items) =>
		items.map((item, index) => (
			<MDBDropdownItem
				className="my-dropdown__item"
				active={activeItem && activeItem.label === item.label}
				key={index + item.label}
				onClick={onClickHandler.bind(null, item, index)}
			>
				{item.label}
			</MDBDropdownItem>
		));

	return (
		<MDBDropdown className={`my-dropdown ${THEME}`} size="sm">
			<MDBDropdownToggle caret color="none">
				Сортировать по:
			</MDBDropdownToggle>
			<MDBDropdownMenu basic color="default" className="my-dropdown__menu">
				{generateItems(items)}
			</MDBDropdownMenu>
		</MDBDropdown>
	);
};

export default DropDown;
