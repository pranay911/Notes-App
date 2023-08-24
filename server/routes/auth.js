const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["profile"],
      state: true,
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
    }
  )
);

// Google Login Route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// Retrieve user data
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login-failure",
    successRedirect: "/dashboard",
  })
);
//Route if something goes wrong
router.get("/login-failure", (req, res) => {
  res.send("Something went wrong");
});

//Persists user data after successful autentication

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//Retrieve user data from session

passport.serializeUser(function (id, done) {
  User.FindById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = router;
