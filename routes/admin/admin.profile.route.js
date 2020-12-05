const router = require("express").Router();
const profile = require("../../controllers/admin/admin.profile.controller");
const auth = require("../../middleware/auth");

//router.post("/", profile.create);
router.get("/", auth.isLoggedIn, profile.index);
router.post("/", auth.isLoggedIn, profile.index);

module.exports = router