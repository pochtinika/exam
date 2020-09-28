import React from "react";
import { useDispatch } from "react-redux";
import { MDBCol, MDBIcon } from "mdbreact";
import { addItem } from "../../redux/actions/cart";
import { useHistory } from "react-router-dom";
import { prettifyPrice } from "../../utils/prettifyPrice";
import Rating from "@material-ui/lab/Rating";

import "./LaptopCard.scss";

const LaptopCard = ({ laptop, size, THEME = "" }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	// Adding item to Cart
	const addToCartHandler = (e) => {
		e.stopPropagation();
		dispatch(addItem(laptop));
	};

	// Define size of the Card depending on "Grid Size"(global state) from parent Container
	const cardSize = {
		xs: "12",
		md: size === "big" ? "6" : "4",
		lg: size === "big" ? "4" : "3",
	};

	return (
		<MDBCol xs={cardSize.xs} md={cardSize.md} lg={cardSize.lg} className="mt-4">
			<div className={`laptop-card ${size} ${THEME}`} onClick={() => history.push("/laptops/" + laptop._id)}>
				<div className="laptop-card__image">
					<img className="laptop-card__img" src={laptop.preview} alt="preview" />
				</div>
				<div className="laptop-card__name">{laptop.name}</div>
				<div className="laptop-card__description">{laptop.description}</div>
				<Rating name="read-only" value={laptop.rating} readOnly className="mt-1" />
				<div className="d-flex justify-content-between align-items-center mt-3">
					<div className="laptop-card__price">{prettifyPrice(laptop.price)}</div>
					<MDBIcon icon="shopping-cart" className="laptop-card__add" onClick={addToCartHandler} />
				</div>
				<div className="laptop-card__presence">Есть в наличии</div>
			</div>
		</MDBCol>
	);
};

export default LaptopCard;
