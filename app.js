require("dotenv").config();

const express = require("express");

const mongoDatabase = require("./config/database");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");

const { sessionMiddleware } = require("./config/session")

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

// connect to mongo database
mongoDatabase.connectToMongoDatabase();

// app.get("/", (req, res) => {
//   res.send("Hello world!");
// })

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
})