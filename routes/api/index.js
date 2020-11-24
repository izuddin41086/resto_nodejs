const router = require("express").Router();

router.use("/products", require("./products.route"))

module.exports = router