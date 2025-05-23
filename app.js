if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const MongoStore = require('connect-mongo') 
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// app.use((req, res, next) => {
//   res.locals.currUser = req.user;  // makes currUser available in all ejs views
//   next();
// });

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// connecting DB
const dbUrl = process.env.ATLAS_DB_URL;

async function main() {
  await mongoose.connect(dbUrl);
}

main()
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });


const store = MongoStore.create({
  mongoUrl : dbUrl,
  crypto : {
    secret: process.env.SECRET,
  },
  touchAfter: 24*3600,
})

store.on("error", () => {
  console.log("ERROR in MONGO SESSION STORE", err);
})

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};


app.use(session(sessionOptions));
app.use(flash());

// telling system that, we will use passport(Used to authenticate user)
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// Serializing user = adding info of user in db
// Deserializing user = removing info of user from db
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// confirms that server is listening
app.listen(8080, () => {
  console.log("Server is listening to port 8080");
});

// Handling errors
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});
app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  res.render("./error.ejs", { message });
});