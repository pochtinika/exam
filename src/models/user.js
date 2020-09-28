const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const schema = Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		name: {
			type: String,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
			trim: true,
		},
		recieveEmails: {
			type: Boolean,
			default: false,
		},
		role: {
			type: String,
			required: true,
			enum: ["user", "admin", "owner"],
			default: "user",
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
		purchasesNumber: {
			type: Number,
			default: 0,
		},
		cart: [
			{
				type: Schema.Types.ObjectId,
				ref: "Laptop",
			},
		],
	},
	{
		timestamps: true,
	}
);

schema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;
	delete userObject.cart;

	return userObject;
};

schema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET || config.get("jwtSecret"), { expiresIn: "1d" });

	user.tokens = user.tokens.concat({ token });
	await user.save();

	const { payload } = jwt.decode(token, { complete: true });

	return { token, expiresIn: payload.exp };
};

schema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error("Ошибка входа в систему 🚫. Возможно вы не зарегистрированы или ввели неправильный пароль");
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error("Ошибка входа в систему 🚫. Возможно вы не зарегистрированы или ввели неправильный пароль");
	}

	return user;
};

// Hash the plain text password before saving
schema.pre("save", async function (next) {
	const user = this;

	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

const User = model("User", schema);

module.exports = User;
