const { renderFile } = require("ejs");
const jwt = require("jsonwebtoken");
exports.tokenCheck = (req, res, next) => {
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Auth Error" });
  try {
    const decoded = jwt.verify(token, "randomString");
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
}

exports.isLoggedIn = (req, res, next) => {
  var sess = req.session
  if (sess.isLoggedIn){
    next();
  }else{
    res.redirect("/admin/login")
  }
}