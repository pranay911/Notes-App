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
  res.render("dashboard/index", {
    userName: req.user.displayName,
    locals,
    layout: "../views/layouts/dashboard",
  });
};
