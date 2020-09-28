import React, { useState } from "react";

import "./Checkbox.scss";

const Checkbox = ({ label, onToggle, active = false, lowercase = false, THEME = "" }) => {
	const [isChecked, setIsChecked] = useState(active);

	const onClickHandler = () => {
		setIsChecked(!isChecked);
		onToggle(label);
	};

	const id = Math.random() + label;
	const isLowerCase = lowercase ? " checkbox_lowercase " : "";

	return (
		<div className={`checkbox ${THEME} ${isLowerCase} d-flex align-items-center`} onClick={onClickHandler}>
			<input id={id} name="dot" type="checkbox" className="checkbox__dot" checked={isChecked} onChange={(e) => e.preventDefault()} />
			<label htmlFor={id} className="checkbox__dot" onClick={(e) => e.preventDefault()}></label>
			<div className="checkbox__label">{label}</div>
		</div>
	);
};

export default Checkbox;
