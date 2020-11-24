const router = require("express").Router();

router.use("/products", require("./products.route"))
router.use("/profile", require("./profile.route"))

module.exports = router