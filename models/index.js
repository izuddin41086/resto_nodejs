const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.products = require("./product.model.js")(mongoose);
db.profile = require("./profile.model.js")(mongoose);
db.gallery = require("./gallery.model.js")(mongoose);

module.exports = db;