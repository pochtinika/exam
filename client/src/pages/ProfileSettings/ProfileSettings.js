import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { SectionHeader } from "../../ui";
import { MDBContainer, MDBIcon } from "mdbreact";
import { Button } from "../../ui";
import { Formik } from "formik";
import * as Yup from "yup";
import { updateInfo } from "../../redux/actions/user";

import "./ProfileSettings.scss";

const ProfileSettings = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { darkmode, name, email, loading, error } = useSelector((state) => state.user);
	const { message } = useSelector((state) => state.messager);

	const THEME = darkmode ? "darkmode" : "";

	useEffect(() => {
		if (message && !error) {
			history.push("/profile");
		}
	}, [message, error, history]);

	return (
		<section className={`profile section_page ${THEME} `}>
			<MDBContainer className="d-flex flex-column align-items-center">
				<SectionHeader title="Редактировать" THEME={THEME} />
				<Formik
					initialValues={{ email, name }}
					onSubmit={({ name, email }) => {
						dispatch(updateInfo(name, email));
					}}
					validationSchema={Yup.object().shape({
						email: Yup.string().email("Введите корректный email").required("Это поле обязательно"),
						name: Yup.string().required("Это поле обязательно"),
					})}
				>
					{(props) => {
						const { errors, handleChange, handleBlur, handleSubmit } = props;

						return (
							<form className={`profile-form form ${THEME} mt-5`} onSubmit={(e) => e.preventDefault()}>
								<div className="form__text form__title pt-0">Введите данные</div>

								<div className="form__fields">
									<div className="form__field">
										<MDBIcon className="form__icon" icon="user" />
										<input
											className="form__input"
											id="name"
											onChange={handleChange}
											onBlur={handleBlur}
											type="text"
											name="name"
											defaultValue={name}
											placeholder="Введите Ваше имя"
										/>
									</div>
									{errors.name ? <div className="form__text form__error-message">{errors.name}</div> : null}

									<div className="form__field">
										<MDBIcon className="form__icon" icon="envelope" />
										<input
											className="form__input"
											id="email"
											onChange={handleChange}
											onBlur={handleBlur}
											type="text"
											name="email"
											defaultValue={email}
											placeholder="Ваш email"
										/>
									</div>
									{errors.email ? <div className="form__text form__error-message">{errors.email}</div> : null}
								</div>

								<Button label="Применить" disabled={loading} labelShow clickHandler={(e) => handleSubmit(e)} THEME={THEME} />
								<Button
									label="Отмена"
									classes="mt-3"
									disabled={loading}
									labelShow
									clickHandler={() => history.push("/profile")}
									THEME={THEME}
									secondary
								/>
							</form>
						);
					}}
				</Formik>
			</MDBContainer>
		</section>
	);
};

export default ProfileSettings;
