const router = require("express").Router();
const main = require("../../controllers/admin/admin.index.controller");

router.get("/", main.index)
router.get("/login", main.login)
router.post("/login", main.login)
router.get("/register", main.register)
router.get("/forgot", main.forgot)
router.use("/products", require("./admin.products.route"))
router.use("/profile", require("./admin.profile.route"))
router.use("/gallery", require("./admin.gallery.route"))

module.exports = router