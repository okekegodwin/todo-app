require("dotenv").config();

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const store = MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions"
})

store.on("error", (error) => {
  console.log("Session Store Error", error);
})

exports.sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: true // Set to true in production
  }
})