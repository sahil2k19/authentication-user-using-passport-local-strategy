const express = require("express");
const app = express();
const db = require("./database");
const User = require("./User");
const ejs = require("ejs");
const passport = require("passport");
const { initializingPassport, isAuthenticated } = require("./passportConfig");
const expressSession = require("express-session");
const { authenticate } = require("passport");

initializingPassport(passport);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: "secret",
    resave: "false",
    saveUnitialized: "false",
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/register", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    console.log(user.name);
    return res.status(400).send("User already exist");
  }
  console.log(user);
  console.log(User);
  const newUser = await User.create(req.body);
  res.status(201).send(newUser);
});
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/register",
    successRedirect: "/",
  })
);
app.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) console.log(err);
  });
  res.redirect("/login");
});
app.get("/profile", isAuthenticated, (req, res) => {
  res.send(req.user);
});

app.listen(8000, () => {
  console.log("app run on port 8000");
});
