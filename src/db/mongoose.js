const mongoose = require("mongoose");
const config = require("config");

mongoose.connect(process.env.MONGODB_URI || config.get("mongoUrl"), {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
});
