require("dotenv").config();

const express = require("express");

const mongoDatabase = require("./config/database");
const userRoutes = require("./routes/user.route");

const app = express();
const PORT = process.env.PORT;

// third-party middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// endpoints
app.use("/users", userRoutes);

// connect to mongo database
mongoDatabase.connectToMongoDatabase();

// app.get("/", (req, res) => {
//   res.send("Hello world!");
// })

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
})