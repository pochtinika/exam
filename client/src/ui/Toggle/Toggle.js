import React, { useState } from "react";

import "./Toggle.scss";

const Toggle = ({ onToggle, active = false, THEME = "" }) => {
	const [isChecked, setIsChecked] = useState(active);

	const id = Math.random();

	const onClickHandler = () => {
		onToggle(!isChecked);
		setIsChecked(!isChecked);
	};

	return (
		<div className={`mytoggle ${THEME}`} onClick={onClickHandler}>
			<input id={id} type="checkbox" className="mytoggle__input" checked={isChecked} onChange={(e) => e.preventDefault()} />
			<label htmlFor={id} className="mytoggle__label" onClick={(e) => e.preventDefault()} />
		</div>
	);
};

export default Toggle;
