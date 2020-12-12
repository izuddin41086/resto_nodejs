const router = require("express").Router();
const main = require("../../controllers/admin/admin.index.controller");
const auth = require("../../middleware/auth");

router.get("/", auth.isLoggedIn, main.index)
router.get("/login", main.login)
router.post("/login", main.login)
router.post("/register", main.register)
router.get("/forgot", main.forgot)
router.get("/logout", main.logout)
router.use("/categories", require("./admin.categories.route"))
router.use("/products", require("./admin.products.route"))
router.use("/settings", require("./admin.profile.route"))
router.use("/gallery", require("./admin.gallery.route"))

module.exports = router