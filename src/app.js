const express = require("express");
const path = require("path");
const config = require("config");
const authRouter = require("./routers/auth");
const laptopRouter = require("./routers/laptop");
const cartRouter = require("./routers/cart");
const userRouter = require("./routers/user");
require("./db/mongoose");

const PORT = process.env.PORT || config.get("port") || 5000;

const app = express();

// Middleware
app.use(express.json({ extended: true }));

// Routers
app.use("/api/auth", authRouter);
app.use("/api/laptops", laptopRouter);
app.use("/api/cart", cartRouter);
app.use("/api/user", userRouter);

// Production mode
if (process.env.NODE_ENV === "production") {
	app.use("/", express.static(path.join(__dirname, "../", "client", "build")));

	app.get("/*", (req, res) => {
		res.sendfile(path.join((__dirname, "../", "client", "build", "index.html")), (err) => {
			if (err) {
				res.redirect("/");
			}
		});
	});
}

app.listen(PORT, () => console.log("Server is running on port " + PORT));
