const { Router } = require("express");
const Laptop = require("../models/laptop");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = Router();

// /api/cart
router.get("/", auth, async (req, res) => {
	try {
		const { cart } = await User.findById(req.user._id).populate("cart");
		res.json({ cart });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

// /api/cart/add
router.post("/add", auth, async (req, res) => {
	try {
		const laptop = await Laptop.findById(req.body.id);
		const exist = req.user.cart.find((item) => item.equals(laptop._id));

		if (exist) {
			return res.status(400).json({ message: "Вы уже добавляли этот товар в корзину ❌" });
		}
		req.user.cart.push(laptop);
		await req.user.save();

		res.status(201).json({ message: "Товар добавлен в Вашу корзину! ✅🛒", laptop });
	} catch (e) {
		res.status(500).json({ message: "Что-то пошло не так, попробуйте снова ⛔ " });
	}
});

// /api/cart/remove
router.delete("/remove", auth, async (req, res) => {
	try {
		const cartItemIndex = req.user.cart.findIndex((item) => item.equals(req.body.id));
		req.user.cart.splice(cartItemIndex, 1);
		await req.user.save();

		res.status(200).json({ message: "Товар был удален из корзины ❌" });
	} catch (e) {
		res.status(500).json({ message: "Что-то пошло не так, попробуйте снова ⛔" });
	}
});

// /api/cart/buy
router.post("/buy", auth, async (req, res) => {
	try {
		if (!req.user.cart.length) {
			return res.status(400).json({ message: "Ваша корзина пустая ⛔" });
		}
		req.user.purchasesNumber += req.user.cart.length;
		req.user.cart = [];
		await req.user.save();

		res.status(200).json({ user: req.user, message: "Спасибо за покупку! Машинка выехала 🚛" });
	} catch (e) {
		res.status(500).json({ message: "Что-то пошло не так, попробуйте снова ⛔" });
	}
});

module.exports = router;
