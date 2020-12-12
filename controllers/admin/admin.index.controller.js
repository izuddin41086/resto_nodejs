const db = require("../../models");
const User = db.users;
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const site = require("../../middleware/site");

exports.index = async(req, res) => {
	site({ title: "Dashboard", bradcumb: ""})
    res.render('admin/index');
};

exports.login = async(req, res) => {
	var sess = req.session
	if (sess.isLoggedIn){
		res.redirect("/admin/")
	}

	if (Object.keys(req.body).length > 0){
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
		  return res.status(400).json({
			errors: errors.array()
		  });
		}

		const { email, password } = req.body;
		try {
			let user = await User.findOne({
				email
			});

			if (!user)
				return res.status(400).json({
					status: 400,
					message: "User Not Exist"
				});

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch)
				return res.status(400).json({
					status: 400,
					message: "Incorrect Password !"
				});
			/*	const payload = {
					user: {
					id: user.id
					}
				};

			    jwt.sign(payload,"secret",
				{
					expiresIn: 3600
				},(err, token) => {
					if (err) throw err;
					res.status(200).json({
						token
					});
				}
			); */
			sess.isLoggedIn = true
			return res.status(200).json({
				status: 200,
				message: "Success LoggedIn !"
			});
		} catch (e) {
		  console.error(e);
		  res.status(500).json({
			status: 500,
			message: "Server Error"
		  });
		}
    }else{
		res.render('admin/login')
    }
};

exports.register = async(req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array()
		});
	}
	const {
		username,
		email,
		password
	} = req.body;
	try {
		let user = await User.findOne({
			email
		});
		if (user) {
			return res.status(400).json({
				msg: "User Already Exists"
			});
		}
		user = new User({
			username,
			email,
			password
		});
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);
		await user.save();
		const payload = {
			user: {
				id: user.id
			}
		};
		jwt.sign(
			payload,
			"randomString", {
				expiresIn: 10000
			},
			(err, token) => {
				if (err) throw err;
				res.status(200).json({
					token
				});
			}
		);
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Error in Saving");
	}
};

exports.forgot = async(req, res) => {
    if (req.body.length > 0){
    }else{
        // Validate request
        res.render("admin/forgot", { layout: 'admin/auth_layout'  })
    }
};

exports.logout = async(req, res) => {
	var sess = req.session
	sess.isLoggedIn = false
	res.redirect("/admin/login")
}