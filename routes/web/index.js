const router = require("express").Router();
const ctrlIndex = require('../../controllers/web/index.controller')

router.get("/", ctrlIndex.index)

module.exports = router