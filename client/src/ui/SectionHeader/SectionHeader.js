import React from "react";

import "./SectionHeader.scss";

const SectionHeader = ({ title, THEME = "" }) => {
	return <h2 className={`section-header ${THEME}`}>{title}</h2>;
};

export default SectionHeader;
