require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./server/config/db");
const session = require("express-session");
const methodOverride = require("method-override");
const passport = require("passport");
const MongoStrore = require("connect-mongo");

const app = express();
const port = 5000 || process.env.PORT;

app.use(
  session({
    secret: "notes-session",
    resave: false,
    saveUninitialized: true,
    store: MongoStrore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    // cookie: { maxAge: new Date(Date.now() + 3600000) },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(methodOverride("_method"));
//Database connection
connectDB();

// Static Files
app.use(express.static("public"));

//Templating Engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

//Routes
app.use("/", require("./server/routes/index"));
app.use("/", require("./server/routes/dashboard"));
app.use("/", require("./server/routes/auth"));

// Handle 404
app.get("*", function (Req, res) {
  res.status(404).render("404");
});

app.listen(port, (req, res) => {
  console.log(`App listening on Port: ${port}`);
});
