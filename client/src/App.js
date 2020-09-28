import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { autoLogin } from "./redux/actions/auth";
import { getCartItems } from "./redux/actions/cart";
import { getUserData } from "./redux/actions/user";
import { Auth, Laptops, Home, Cart, AddLaptop, Profile, LaptopDetails, ProfileSettings, Roles } from "./pages";
import { Navbar, Messager } from "./components";

const App = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.token);
	const userRole = useSelector((state) => state.user.role);

	useEffect(() => {
		if (!isAuthenticated) {
			dispatch(autoLogin());
		} else {
			dispatch(getCartItems());
			dispatch(getUserData());
		}
	}, [dispatch, isAuthenticated]);

	if (isAuthenticated) {
		return (
			<Router>
				{isAuthenticated && <Navbar />}
				<Messager />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/laptops" exact component={Laptops} />
					<Route path="/laptops/:id" component={LaptopDetails} />
					<Route path="/cart" component={Cart} />
					<Route path="/profile" exact component={Profile} />
					<Route path="/profile/settings" exact component={ProfileSettings} />
					{userRole === "admin" || userRole === "owner" ? <Route path="/add" component={AddLaptop} /> : null}
					{userRole === "owner" ? <Route path="/roles" component={Roles} /> : null}
					<Redirect to="/" />
				</Switch>
			</Router>
		);
	}

	return (
		<Router>
			<Messager />
			<Switch>
				<Route path="/auth" component={Auth} />
				<Redirect to="/auth" />
			</Switch>
		</Router>
	);
};

export default App;
