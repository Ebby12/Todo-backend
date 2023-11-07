const Router = require("express");

const User = require("./user");
const Task = require("./task");

const router = Router();

// different model routes

router.use("/users", User);
router.use("/tasks", Task);

module.exports = router;
