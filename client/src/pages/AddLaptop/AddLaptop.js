import React from "react";
import { SectionHeader } from "../../ui";
import { MDBContainer } from "mdbreact";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "../../ui";
import { Formik } from "formik";
import * as Yup from "yup";
import { addLaptop } from "../../redux/actions/laptop";

import "./AddLaptop.scss";

const AddLaptop = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { darkmode } = useSelector((state) => state.user);

	const THEME = darkmode ? "darkmode" : "";

	const fields = [
		{ name: "name", element: "input", placeholder: "Заголовок товара" },
		{ name: "brand", element: "input", placeholder: "Название брэнда" },
		{ name: "description", element: "textarea", placeholder: "Короткое описание товара" },
		{ name: "preview", element: "input", placeholder: "Ссылка на превью товара (картинка)" },
		{ name: "images", element: "textarea", placeholder: "Изображения товара (ссылки) через запятую" },
		{ name: "screen", element: "input", placeholder: "Описание экрана" },
		{ name: "price", element: "input", placeholder: "Сумма товара" },
		{ name: "rating", element: "input", placeholder: "Рейтинг товара" },
		{ name: "processor", element: "input", placeholder: "Описание процессора" },
		{ name: "coreNumber", element: "input", placeholder: "Количество ядер" },
		{ name: "ram", element: "input", placeholder: "Описание ОЗУ" },
		{ name: "ramSize", element: "input", placeholder: "Объем ОЗУ (цифра)" },
		{ name: "os", element: "input", placeholder: "Установаленная ОС" },
		{ name: "color", element: "input", placeholder: "Цвет" },
		{ name: "keyboard", element: "input", placeholder: "Клавиатура" },
		{ name: "hardDrive", element: "input", placeholder: "Жесткий Диск" },
		{ name: "battery", element: "input", placeholder: "Батарея" },
		{ name: "weight", element: "input", placeholder: "Вес товара" },
		{ name: "gpu", element: "input", placeholder: "Видеокарта" },
		{ name: "ports", element: "input", placeholder: "Порты" },
	];

	const renderFields = (touched, errors, handleChange, handleBlur) => {
		return fields.map((field) => {
			if (field.element === "input") {
				return (
					<React.Fragment key={field.name + field.placeholder}>
						<div className="form__field">
							<input
								className="form__input"
								id={field.name}
								onChange={handleChange}
								onBlur={handleBlur}
								type="text"
								name={field.name}
								placeholder={field.placeholder}
							/>
						</div>
						{errors[field.name] && touched[field.name] ? (
							<div className="form__text form__error-message">{errors[field.name]}</div>
						) : null}
					</React.Fragment>
				);
			} else {
				return (
					<React.Fragment key={field.name + field.placeholder}>
						<div className="form__field">
							<textarea
								className="form__input"
								id={field.name}
								onChange={handleChange}
								onBlur={handleBlur}
								type="text"
								name={field.name}
								rows="5"
								placeholder={field.placeholder}
							/>
						</div>
						{errors[field.name] && touched[field.name] ? (
							<div className="form__text form__error-message">{errors[field.name]}</div>
						) : null}
					</React.Fragment>
				);
			}
		});
	};

	return (
		<section className={`add-laptop section_page ${THEME}`}>
			<MDBContainer className="d-flex flex-column align-items-center">
				<SectionHeader title="Добавить ноутбук" />
				<Formik
					initialValues={{
						name: "",
						brand: "",
						description: "",
						preview: "",
						images: "",
						screen: "",
						price: "",
						rating: "",
						processor: "",
						coreNumber: "",
						ram: "",
						ramSize: "",
						os: "",
						color: "",
						keyboard: "",
						hardDrive: "",
						battery: "",
						weight: "",
						gpu: "",
						ports: "",
					}}
					onSubmit={(values) => {
						dispatch(addLaptop(values));
					}}
					validationSchema={Yup.object().shape({
						name: Yup.string().required("Это поле обязательно"),
						brand: Yup.string().required("Это поле обязательно"),
						description: Yup.string().required("Это поле обязательно"),
						preview: Yup.string().required("Это поле обязательно").url("Это должна быть ссылка на картинку"),
						images: Yup.string().required("Это поле обязательно"),
						screen: Yup.string().required("Это поле обязательно"),
						price: Yup.number()
							.required("Это поле обязательно")
							.positive("Сумма должна быть положительной")
							.typeError("Вы должны ввести цифру"),
						rating: Yup.number()
							.required("Это поле обязательно")
							.min(1, "Минимальный рейтинг 1 балл")
							.max(5, "Максимальный рейтинг 5 баллов")
							.typeError("Вы должны ввести цифру"),
						processor: Yup.string().required("Это поле обязательно"),
						coreNumber: Yup.number()
							.required("Это поле обязательно")
							.min(1, "Минимальное количество ядер 1")
							.typeError("Вы должны ввести цифру"),
						ram: Yup.string().required("Это поле обязательно"),
						ramSize: Yup.number().required("Это поле обязательно").min(1, "Минимальный объем 1 Гб").typeError("Вы должны ввести цифру"),
						os: Yup.string().required("Это поле обязательно"),
						color: Yup.string().required("Это поле обязательно"),
						keyboard: Yup.string().required("Это поле обязательно"),
						hardDrive: Yup.string().required("Это поле обязательно"),
						battery: Yup.string().required("Это поле обязательно"),
						weight: Yup.string().required("Это поле обязательно"),
						gpu: Yup.string().required("Это поле обязательно"),
						ports: Yup.string().required("Это поле обязательно"),
					})}
				>
					{(props) => {
						const { touched, errors, handleChange, handleBlur, handleSubmit } = props;

						return (
							<form className={`laptop-form form ${THEME} mt-5`} onSubmit={(e) => e.preventDefault()}>
								<div className="form__text form__title pt-0">Введите данные</div>

								<div className="form__fields">{renderFields(touched, errors, handleChange, handleBlur)}</div>

								<Button label="Добавить" small disabled={false} labelShow clickHandler={(e) => handleSubmit(e)} THEME={THEME} />
								<Button
									label="Отмена"
									classes="mt-3"
									disabled={false}
									labelShow
									clickHandler={() => history.push("/home")}
									THEME={THEME}
									secondary
									small
								/>
							</form>
						);
					}}
				</Formik>
			</MDBContainer>
		</section>
	);
};

export default AddLaptop;
