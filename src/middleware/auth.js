const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/user");

const auth = async (req, res, next) => {
	try {
		const token = req.header("Authorization").replace("Bearer ", "");
		const decoded = jwt.verify(token, process.env.JWT_SECRET || config.get("jwtSecret"));
		const user = await User.findOne({ _id: decoded._id, "tokens.token": token });

		if (!user) {
			throw new Error();
		}

		req.token = token;
		req.user = user;
		next();
	} catch (e) {
		res.status(401).send({ message: "Авторизуйтесь, пожалуйста", e });
	}
};

module.exports = auth;
