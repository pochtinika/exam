import React from "react";
import { MDBIcon } from "mdbreact";

import "./Button.scss";

const Button = ({
	classes = "",
	type = "submit",
	label,
	disabled = false,
	clickHandler,
	xs = false, // extra small button
	small = false,
	icon = null, // name of the icon which shows near label
	labelShow = false, // display label or not
	THEME = "",
	secondary = false,
}) => {
	let classNames = "mybtn";
	classNames += small ? " small " : "";
	classNames += xs ? " xs " : "";
	classNames += classes ? ` ${classes} ` : "";
	classNames += ` ${THEME} `;
	classNames += secondary ? ` secondary ` : "";

	return (
		<button type={type} className={classNames} disabled={disabled} onClick={clickHandler}>
			{icon ? <MDBIcon icon={icon} /> : null}
			<span className={`mybtn__label d-none d-md-block ${icon ? "ml-2" : ""} ${labelShow ? "label-show" : ""}`}>{label}</span>
		</button>
	);
};

export default Button;
