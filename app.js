require("dotenv").config();
const express = require("express");

const mongoDatabase = require("./config/database");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const todoRoute = require("./routes/todo.route");
const { sessionMiddleware } = require("./config/session");

const app = express();
const PORT = process.env.PORT;

// session middleware
app.use(sessionMiddleware);

// third-party middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// endpoints
app.use("/auth", authRoute);
app.use("/profile", userRoute);
app.use("/todo", todoRoute);

// connect to mongo database
mongoDatabase.connectToMongoDatabase();

app.get("/", (req, res) => {
  res.send("WELCOME TO THE HOME PAGE!");
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
})