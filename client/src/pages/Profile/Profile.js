import React from "react";
import { SectionHeader, Toggle } from "../../ui";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeDarkMode, changeMailing } from "../../redux/actions/user";

import "./Profile.scss";

const Profile = () => {
	const dispatch = useDispatch();
	const { darkmode, purchasesNumber, recieveEmails, name, email } = useSelector((state) => state.user);

	const THEME = darkmode ? "darkmode" : "";

	return (
		<section className={`profile section_page ${THEME}`}>
			<MDBContainer>
				<SectionHeader title="Мой профиль" THEME={THEME} />
				<MDBRow>
					<MDBCol xs="12" lg="6">
						<div className="profile__avatar avatar">
							<div className="avatar__back">
								<div className="avatar__front">
									<div className="avatar__face"></div>
									<div className="avatar__body"></div>
								</div>
								<Link to="/profile/settings">
									<div className="profile__edit_back">
										<div className="profile__edit_front">
											<MDBIcon icon="pencil-alt" />
										</div>
									</div>
								</Link>
							</div>
						</div>
					</MDBCol>
					<MDBCol xs="12" lg="6">
						<div className="profile__info info">
							<h4 className="text-center">
								Информация <MDBIcon icon="info-circle" />
							</h4>
							<h6 className="info__text">
								Количество купленных Вами товаров: <span className="info__text_bold">{purchasesNumber}</span>
							</h6>
							<h6 className="info__text">
								Ваше имя: <span className={`info__text_bold ${name ? "" : "info__text_undefined"}`}>{name || "Не задано"}</span>
							</h6>
							<h6 className="info__text">
								Ваш email: <span className="info__text_bold">{email}</span>
							</h6>
						</div>
					</MDBCol>
				</MDBRow>
				<MDBRow>
					<MDBCol xl="12">
						<div className="profile__settings settings">
							<h4 className="text-center">
								Настройки <MDBIcon icon="cog" />
							</h4>
							<div className="settings__block mb-2">
								<div className="settings__name">Ночной режим: </div>
								<div className="settings__option">
									<Toggle onToggle={(value) => dispatch(changeDarkMode(value))} active={darkmode} THEME={THEME} />
								</div>
							</div>
							<div className="settings__block mb-2">
								<div className="settings__name">Получать уведомления на почту о поступивших товарах:</div>
								<div className="settings__option">
									<Toggle onToggle={(value) => dispatch(changeMailing(value))} active={recieveEmails} THEME={THEME} />
								</div>
							</div>
						</div>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</section>
	);
};

export default Profile;
