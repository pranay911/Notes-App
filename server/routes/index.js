const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

/*
App Routes

*/

// Home page
router.get("/", mainController.homepage);

//about page
router.get("/about", mainController.about);

module.exports = router;
