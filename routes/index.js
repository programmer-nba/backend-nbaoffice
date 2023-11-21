const router = require("express").Router();
const main = require("../controllers/main.controller.js");
const auth = require("../middleware/auth");

router.post("/login", main.Login);
router.get("/me",auth, main.me);

module.exports = router;
