const Note = require("../models/Notes");
const mongoose = require("mongoose");
/*
Get Dashboard Page

*/
exports.dashboard = async (req, res) => {
  const locals = {
    title: "Dashboard",
    description: "Notes taking app in Node js",
  };

  try {
    /// get notes
    const notes = await Note.find({});

    res.render("dashboard/index", {
      userName: req.user.firstName,
      locals,
      notes,
      layout: "../views/layouts/dashboard",
    });
  } catch (err) {
    console.log(err);
  }
};
