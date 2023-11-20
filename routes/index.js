const router = require("express").Router();
const main = require("../controllers/main.controller.js");

router.post("/login", main.Login);

module.exports = router;
