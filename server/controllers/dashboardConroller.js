const Note = require("../models/Notes");
const mongoose = require("mongoose");
const User = require("../models/User");

/**
 * GET /
 * Dashboard
 */
exports.dashboard = async (req, res) => {
  let perPage = 12;
  let page = req.query.page || 1;

  const locals = {
    title: "Dashboard",
    description: "Free NodeJS Notes App.",
  };

  try {
    // Mongoose "^7.0.0 Update

    // if (!mongoose.Types.ObjectId.isValid(req.user.id.trim())) {
    //   return res.send("Invalid User Id");
    // }

    const userId = new mongoose.Types.ObjectId(req.user.id);
    const notes = await Note.aggregate([
      { $sort: { updatedAt: -1 } },
      { $match: { user: userId } },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$body", 0, 100] },
        },
      },
    ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    console.log(notes);
    const count = await Note.count({ user: userId });

    res.render("dashboard/index", {
      userName: req.user.firstName,
      locals,
      notes,
      layout: "../views/layouts/dashboard",
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
  }
};
