const owner = async (req, res, next) => {
	try {
		if (req.user.role !== "owner") {
			throw new Error();
		}

		next();
	} catch (e) {
		res.status(403).send({ message: "У вас нет прав!", e });
	}
};

module.exports = owner;
