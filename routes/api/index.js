const router = require("express").Router();

router.use("/products", require("./products.route"))
router.use("/profile", require("./profile.route"))
router.use("/gallery", require("./gallery.route"))

module.exports = router