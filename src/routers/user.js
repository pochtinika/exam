const { Router } = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const owner = require("../middleware/owner");
const router = Router();

// /api/user/users?skip=30
// /api/user/users?email=some@email.com
router.get("/users", auth, owner, async (req, res) => {
	try {
		const match = { role: { $ne: "owner" } };
		const skip = parseInt(req.query.skip);

		if (req.query.email) {
			match.email = new RegExp(req.query.email, "i");
		}

		const users = await User.find(match, null, { limit: 30, skip });
		const allUsersCount = await User.find(match).countDocuments();

		res.json({ users, allUsersCount });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

// /api/user:id
router.patch("/", auth, owner, async (req, res) => {
	try {
		const userId = req.query.id;
		const update = { role: req.body.role };
		const user = await User.findByIdAndUpdate(userId, update);

		res.json({ message: "Права пользователя изменены ✅" });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

// /api/user/me
router.get("/me", auth, async (req, res) => {
	try {
		res.json(req.user);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

router.patch("/me/mailing", auth, async (req, res) => {
	try {
		const value = req.body.recieveEmails;
		req.user.recieveEmails = value;
		const message = value ? "Вы подключили уведомления 📩" : "Вы отменили рассылку";
		await req.user.save();

		res.json({ user: req.user, message });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

router.patch("/me/info", auth, async (req, res) => {
	try {
		let { name, email } = req.body;
		name = name.trim().toLowerCase();
		email = email.trim().toLowerCase();

		// Checking if is there user with requseted email
		if (email !== req.user.email) {
			const candidat = await User.findOne({ email });

			if (candidat) {
				return res.status(400).json({ message: "Email занят" });
			}
		}

		// Checking if data is not the same
		if (req.user.name === name && req.user.email === email) {
			return res.status(400).json({ message: "Хотя бы одно поле должно поменяться 🚫" });
		}

		req.user.name = name;
		req.user.email = email;

		const message = "Информация обновлена ✅";
		await req.user.save();

		res.json({ user: req.user, message });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

module.exports = router;
