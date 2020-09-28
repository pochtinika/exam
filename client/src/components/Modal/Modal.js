import React from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../../ui";
import { toggleModal } from "../../redux/actions/modal";

import "./Modal.scss";

const Modal = ({ title, children, body }) => {
	const dispatch = useDispatch();
	// Global State
	const { darkmode } = useSelector((state) => state.user);
	const { isOpen } = useSelector((state) => state.modal);

	const THEME = darkmode ? "darkmode" : "";

	return (
		<>
			<MDBContainer>
				<MDBModal className={`my-modal ${THEME}`} isOpen={isOpen} toggle={dispatch.bind(null, toggleModal())} centered>
					<MDBModalHeader toggle={dispatch.bind(null, toggleModal())}>{title}</MDBModalHeader>
					<MDBModalBody>{body}</MDBModalBody>
					<MDBModalFooter>
						<Button
							label="Отмена"
							classes="mr-3"
							disabled={false}
							labelShow
							clickHandler={dispatch.bind(null, toggleModal())}
							THEME={THEME}
							secondary
							xs
						/>
						{children}
					</MDBModalFooter>
				</MDBModal>
			</MDBContainer>
		</>
	);
};

export default Modal;
