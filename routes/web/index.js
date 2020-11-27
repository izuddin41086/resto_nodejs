const router = require("express").Router();
const ctrlIndex = require('../../controllers/web/index.controller')
const ctrlProducts = require('../../controllers/web/products.controller')
const ctrlOrders = require('../../controllers/web/orders.controller')

router.get("/", ctrlIndex.index)
router.get("/products/:id", ctrlProducts.detail)
router.post("/orders/confirm/:id", ctrlOrders.confirmOrder)

module.exports = router