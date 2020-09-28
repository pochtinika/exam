import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBDataTable } from "mdbreact";
import { useHistory } from "react-router-dom";
import { removeItem, buy } from "../../redux/actions/cart";
import { prettifyPrice } from "../../utils/prettifyPrice";
import { Button, SectionHeader } from "../../ui";

import "./Cart.scss";

const Cart = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const { loading, items: cartItems } = useSelector((state) => state.cart);
	const { darkmode } = useSelector((state) => state.user);

	const THEME = darkmode ? "darkmode" : "";

	// Calculate Total Cart Price
	const totalPrice = useMemo(() => cartItems.reduce((acc, item) => (acc += item.price), 0), [cartItems]);

	// Generate Table rows from our Cart state (Items we added to the cart)
	const rowItems = cartItems.map((item) => ({
		...item,
		price: prettifyPrice(item.price), // Prettify Price (adding currency sign)
		// Adding custom Delete button to Each Table Row
		remove: (
			<button className="remove-item" disabled={loading} onClick={(e) => removeItemHandler(e, item._id)}>
				Убрать
			</button>
		),
		clickEvent() {
			history.push("/laptops/" + item._id);
		},
	}));

	// Remove from Cart click Handler
	const removeItemHandler = (e, id) => {
		e.stopPropagation();
		dispatch(removeItem(id));
	};

	// Creating Table columns
	const data = {
		columns: [
			{
				label: "Название",
				field: "name",
				sort: "asc",
			},
			{
				label: "Цена",
				field: "price",
				sort: "asc",
			},
			{
				label: "Действия",
				field: "remove",
			},
		],
		rows: rowItems,
	};
	return (
		<section className={`cart section_page ${THEME}`}>
			<MDBContainer>
				<SectionHeader title="Корзина" />
				<h5 className="cart__title">
					В Вашей корзине{" "}
					<span role="img" aria-label="cart emoji">
						🛒
					</span>{" "}
					товаров на общую сумму: <span className="cart__total-price">{prettifyPrice(totalPrice)}</span>
				</h5>

				<MDBDataTable
					striped
					bordered
					responsive
					small
					btn
					hover
					data={data}
					infoLabel={["Показывается", "до", "из", "товаров"]}
					paginationLabel={["Назад", "Вперед"]}
					searchLabel="Поиск"
					noBottomColumns
					displayEntries={false}
					noRecordsFoundLabel="В вашей корзине пусто 😔"
				/>
				<Button
					label="Приобрести все"
					labelShow
					classes="center"
					disabled={loading}
					clickHandler={dispatch.bind(null, buy())}
					small
					THEME={THEME}
				/>
			</MDBContainer>
		</section>
	);
};

export default Cart;
