import React from "react";
import { MDBContainer } from "mdbreact";
import { Form } from "../../components";
import { useSelector } from "react-redux";

import "./Auth.scss";

const Auth = () => {
	const { darkmode } = useSelector((state) => state.user);

	const THEME = darkmode ? "darkmode" : "";

	return (
		<section className={`auth section_page ${THEME}`}>
			<MDBContainer className="d-flex justify-content-center">
				<Form THEME={THEME} />
			</MDBContainer>
		</section>
	);
};

export default Auth;
