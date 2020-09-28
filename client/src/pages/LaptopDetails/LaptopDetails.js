import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { MDBContainer, MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBTable, MDBTableBody } from "mdbreact";
import { SectionHeader, Button } from "../../ui";
import { deleteLaptop } from "../../redux/actions/laptop";
import { Modal } from "../../components";
import { toggleModal } from "../../redux/actions/modal";

import "./LaptopDetails.scss";

const LaptopDetails = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	const { laptops, error, loading } = useSelector((state) => state.laptop);
	const { message } = useSelector((state) => state.messager);
	const { darkmode, role } = useSelector((state) => state.user);

	const THEME = darkmode ? "darkmode" : "";

	// Find needed laptop with id recieved from router history
	const laptop = laptops.find((item) => item._id === params.id);

	useEffect(() => {
		// Scroll page to top when enter the page
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		if (message && !error) {
			history.push("/laptops");
		}
	}, [message, error, history]);

	// Generate slides from laptop images, received from server
	const createSlides = () =>
		laptop.images.map((image, index) => (
			<MDBCarouselItem itemId={index + 1} key={index}>
				<MDBView>
					<img className="" src={image} alt="slide" />
				</MDBView>
			</MDBCarouselItem>
		));

	const onDeleteLaptop = () => {
		dispatch(deleteLaptop(laptop._id));
		dispatch(toggleModal());
	};

	return (
		<section className={`details section_page ${THEME}`}>
			<MDBContainer>
				<SectionHeader title="Полное описание" />
				<h4 className="my-4 text-center font-weight-bold">{laptop.name}</h4>
				<MDBCarousel
					className="details__slider"
					activeItem={1}
					length={laptop.images.length}
					showControls={true}
					showIndicators={true}
					interval={2000}
				>
					<MDBCarouselInner>{createSlides()}</MDBCarouselInner>
				</MDBCarousel>
				<h4 className="my-4 text-center font-weight-bold">Характеристики</h4>
				<MDBTable striped responsive>
					<MDBTableBody>
						<tr>
							<td className="font-weight-bold w-25">Короткое описание:</td>
							<td>{laptop.description}</td>
						</tr>
						<tr>
							<td className="font-weight-bold w-25">Экран:</td>
							<td>{laptop.screen}</td>
						</tr>
						<tr>
							<td className="font-weight-bold w-25">Процессор:</td>
							<td>{laptop.processor}</td>
						</tr>
						<tr>
							<td className="font-weight-bold w-25">Оперативная память:</td>
							<td>{laptop.ram}</td>
						</tr>
						<tr>
							<td className="font-weight-bold w-25">Операционная система:</td>
							<td>{laptop.os}</td>
						</tr>
						<tr>
							<td className="font-weight-bold w-25">Видеокарта:</td>
							<td>{laptop.gpu}</td>
						</tr>
						<tr>
							<td className="font-weight-bold w-25">Цвет:</td>
							<td>{laptop.color}</td>
						</tr>
						<tr>
							<td className="font-weight-bold w-25">Клавиатура:</td>
							<td>{laptop.keyboard}</td>
						</tr>
						<tr>
							<td className="font-weight-bold w-25">Жесткий диск:</td>
							<td>{laptop.hardDrive}</td>
						</tr>
						<tr>
							<td className="font-weight-bold w-25">Порты:</td>
							<td>{laptop.ports}</td>
						</tr>
						<tr>
							<td className="font-weight-bold w-25">Батарея:</td>
							<td>{laptop.battery}</td>
						</tr>
						<tr>
							<td className="font-weight-bold w-25">Вес:</td>
							<td>{laptop.weight}</td>
						</tr>
					</MDBTableBody>
				</MDBTable>
				{role !== "user" && (
					<Button
						label="Удалить товар"
						icon="trash-alt"
						classes="center"
						small
						disabled={loading}
						labelShow
						clickHandler={dispatch.bind(null, toggleModal())}
						THEME={THEME}
					/>
				)}
				{role !== "user" && (
					<Modal
						title="Подтвердите действия"
						body="Вы уверены что хотите удалить этот товар из базы данных? Это действие невозможно будет отменить"
					>
						<Button label="Удалить" xs disabled={loading} labelShow clickHandler={onDeleteLaptop} THEME={THEME} />
					</Modal>
				)}
			</MDBContainer>
		</section>
	);
};

export default LaptopDetails;
