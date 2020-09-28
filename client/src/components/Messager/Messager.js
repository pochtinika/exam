import React, { useEffect } from "react";
import { notify } from "../../utils/notify";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import "./Messager.scss";

const Messages = () => {
	const message = useSelector((state) => state.messager.message);

	useEffect(() => {
		if (message) {
			notify(message);
		}
	}, [message]);

	return (
		<div className="messager">
			<ToastContainer />
		</div>
	);
};

export default Messages;
