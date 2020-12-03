const router = require("express").Router();
const profile = require("../../controllers/admin/admin.profile.controller");

//router.post("/", profile.create);
router.get("/", profile.findAll);
router.get("/published", profile.findAllPublished);
router.get("/:id", profile.findOne);
router.put("/:id", profile.update);
//router.delete("/:id", profile.delete);
//router.delete("/", profile.deleteAll);

module.exports = router