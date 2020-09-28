const { Router } = require("express");
const Laptop = require("../models/laptop");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const router = Router();

// /api/laptops
// /api/laptops?skip=12
// /api/laptops?sortBy=createdAt:desc
// /api/laptops?sortBy=price:desc
// /api/laptops?sortBy=rating:desc
// /api/laptops?brand=ASUS,APPLE
// /api/laptops?price=5000,30000
// /api/laptops?cores=2 ядра,4 ядра
// /api/laptops?ram=4 Гб,8 Гб
router.get("/", auth, async (req, res) => {
	const match = {};
	const sort = {};
	const skip = parseInt(req.query.skip);

	if (req.query.sortBy) {
		const parts = req.query.sortBy.split(":");
		sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
	}

	if (req.query.brand) {
		const values = req.query.brand.split(",");
		match.brand = values;
	}

	if (req.query.price) {
		const values = req.query.price.split(",");
		const lowerPrice = parseInt(values[0]);
		const upperPrice = parseInt(values[1]);
		match.price = { $gte: lowerPrice, $lte: upperPrice };
	}

	if (req.query.cores) {
		const values = req.query.cores.split(",").map((coreName) => parseInt(coreName));
		match.coreNumber = values;
	}

	if (req.query.ram) {
		const values = req.query.ram.split(",").map((ramName) => parseInt(ramName));
		match.ramSize = values;
	}

	try {
		const laptops = await Laptop.find(match, null, { limit: 12, skip, sort });
		const allLaptopsCount = await Laptop.find(match).countDocuments();

		res.json({ laptops, allLaptopsCount });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

// /api/laptops/:id
router.get("/:id", auth, async (req, res) => {
	try {
		const laptop = await Laptop.findById(req.params.id);
		if (!laptop) {
			return res.status(404).json({ message: "Произошла ошибка ❌ Попробуйте позже" });
		}
		res.json(laptop);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

// /api/laptops/add
router.post("/add", auth, admin, async (req, res) => {
	try {
		const newLaptop = new Laptop(req.body);
		await newLaptop.save();

		res.status(201).json({ message: "Товар добавлен в базу ✅", newLaptop });
	} catch (e) {
		res.status(500).json({ message: "Что-то пошло не так, попробуйте снова 🚫" });
	}
});

// /api/laptops/delete/:id
router.delete("/delete/:id", auth, admin, async (req, res) => {
	try {
		await Laptop.findOneAndDelete({ _id: req.params.id });

		res.json({ message: "Товар удален из базы ✅" });
	} catch (e) {
		res.status(500).json({ message: "Что-то пошло не так, попробуйте снова 🚫" });
	}
});

module.exports = router;
