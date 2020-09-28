import React, { useEffect } from "react";
import { SectionHeader, Toggle } from "../../ui";
import { MDBContainer, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, changeRole, userChangeQuerySkip, changeSearchByEmail } from "../../redux/actions/user";
import { Pagination } from "../../components";
import { debounce } from "lodash";

import "./Roles.scss";

const Roles = () => {
	const dispatch = useDispatch();
	const { darkmode, users, allUsersCount, querySkip, particularUser } = useSelector((state) => state.user);

	const THEME = darkmode ? "darkmode" : "";

	useEffect(() => {
		dispatch(getUsers(querySkip, particularUser));
	}, [dispatch, querySkip, particularUser]);

	const onToggleRole = (id, val) => dispatch(changeRole(id, val));

	const createRows = () => {
		return users.map((user, index) => (
			<tr key={user._id}>
				<td>{index + 1}</td>
				<td>{user.email}</td>
				<td>
					{user.name || (
						<span className="d-flex" style={{ width: "max-content" }}>
							Не задано
						</span>
					)}
				</td>
				<td className="d-flex align-items-center">
					<span className="mr-2" style={{ width: "max-content" }}>
						нет прав
					</span>
					<Toggle THEME={THEME} active={user.role === "admin"} onToggle={(val) => onToggleRole(user._id, val)} />
					<span className="ml-2">админ</span>
				</td>
			</tr>
		));
	};

	// Pagination between pages
	const onChangePage = (skip) => dispatch(userChangeQuerySkip(skip));

	// Search for a particular user
	const onUserEmailChange = debounce((text) => dispatch(changeSearchByEmail(text)), 1000);

	return (
		<section className={`roles section_page ${THEME}`}>
			<MDBContainer>
				<SectionHeader title="Админка" />
				<h5 className="roles__header">
					Всего зарегистрировано пользователей: <span className="roles__bold">{allUsersCount}</span>
				</h5>
				<div className="roles__field">
					<input
						className="roles__input"
						onChange={(e) => onUserEmailChange(e.target.value)}
						defaultValue={particularUser}
						type="text"
						placeholder="Поиск по email"
					/>
				</div>
				<MDBTable striped responsiveSm className="roles__table">
					<MDBTableHead>
						<tr>
							<th>#</th>
							<th>Email</th>
							<th>Имя</th>
							<th>Права</th>
						</tr>
					</MDBTableHead>
					<MDBTableBody>{createRows()}</MDBTableBody>
				</MDBTable>

				<Pagination
					arrayLength={allUsersCount}
					skip={30}
					THEME={THEME}
					initialPage={querySkip > 0 ? querySkip / 30 : querySkip}
					onChangePage={(page) => onChangePage(page)}
				/>
			</MDBContainer>
		</section>
	);
};

export default Roles;
