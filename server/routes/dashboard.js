const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardConroller");

/*
Get Dashboard Page

*/

router.get("/dashboard", dashboardController.dashboard);

module.exports = router;
