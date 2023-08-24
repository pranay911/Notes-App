const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["profile"],
      state: true,
    },
    async function (accessToken, refreshToken, profile, done) {
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profileImage: profile.photos[0].value,
      };
      try {
        //Existing User
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.log(err);
      }
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

// Presist user data after successful authentication
passport.serializeUser(function (user, done) {
  process.nextTick(function () {
    return done(null, {
      id: user.id,
    });
  });
});

// Retrieve user data from session.
passport.deserializeUser(function (id, done) {
  process.nextTick(function () {
    // User.findById(id, function (err, user) {
    //   return done(err, user);
    // });
    return done(null, id);
  });
});
module.exports = router;
