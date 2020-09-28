const { Router } = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = Router();

// /api/auth/login
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findByCredentials(email, password);
		const { token, expiresIn } = await user.generateAuthToken();

		res.json({ user, token, expiresIn, message: `Здравствуйте, Вы вошли в систему! ✌🏻😎` });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

// /api/auth/logout
router.post("/logout", auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.token;
		});
		await req.user.save();

		res.status(200).json({ message: "Возвращайтесь 😉😊" });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

// /api/auth/signup
router.post("/signup", async (req, res) => {
	try {
		const { email, password } = req.body;

		const candidate = await User.findOne({ email });

		if (candidate) {
			return res.status(400).json({ message: "Такой пользователь уже есть 👤⛔" });
		}

		const purchasesNumber = 0;
		const name = "";

		const user = new User({ email, password, purchasesNumber, name });
		await user.save();

		res.status(201).json({ message: "Вы зарегистрированы ✅" });
	} catch (e) {
		res.status(500).json({ message: "Что-то пошло не так, попробуйте снова 🚫" });
	}
});

// /api/auth/check
router.get("/check", auth, async (req, res) => {
	try {
		res.json({ message: "OK" });
	} catch (e) {
		res.status(500).json({ message: "Что-то пошло не так, попробуйте снова 🚫" });
	}
});

module.exports = router;
