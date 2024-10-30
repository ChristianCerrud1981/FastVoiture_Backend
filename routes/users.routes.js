//External imports
const express = require("express");

//Internal imports
const userControllers = require("../controllers/users.controllers");

//Variables
const router = express.Router();

// Route pour users
router.route("").get(userControllers.getAllUsers);

//Exports
module.exports = router;
