//External imports
const express = require("express");

//Internal imports
const userControllers = require("../controllers/users.controllers");

//Variables
const router = express.Router();

// Route pour users
router.route("").get(userControllers.getAllUsers);

router.route("/register").post(userControllers.register);

router.route("/login").post(userControllers.login);

router.route("/:id").get(userControllers.getSingleUser);

//Exports
module.exports = router;
