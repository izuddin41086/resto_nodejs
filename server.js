const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Connected to the database!");
  }).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

app.use(session({secret: 'wawanjualan', saveUninitialized: true, resave: true}));

// Static Files
app.use("/site_assets", express.static('assets/public'))
app.use("/site_admin", express.static('assets/admin'))

// EJS Layouts
app.use(expressLayouts)
app.set('layout', './layout')
app.set('view engine', 'ejs')

require("./routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});