const db = require("../../models");
const Profile = db.profile;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.name||!req.body.email||!req.body.phone) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Tutorial
    const cprofile = new Profile({
        name: req.body.name,
        moto: req.body.moto,
        submoto: req.body.submoto,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        opening_hours: req.body.opening_hours,
        wa: req.body.wa,
        fb: req.body.fb,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
        published: req.body.published ? req.body.published : false
    });

    // Save Tutorial in the database
    cprofile
      .save(cprofile)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the profile."
        });
      });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Profile.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving profile."
        });
    });
};

exports.findAllPublished = (req, res) => {
    Profile.find({ published: true })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving profile."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Profile.findById(id)
    .then(data => {
    if (!data)
        res.status(404).send({ message: "Not found profile with id " + id });
    else
        res.send(data);
    })
    .catch(err => {
    res
        .status(500)
        .send({ message: "Error retrieving profile with id=" + id });
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;
    //console.log(req.body.opening_hours)

    Profile.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
    if (!data) {
        res.status(404).send({
        message: `Cannot update profile with id=${id}. Maybe Tutorial was not found!`
        });
    } else res.send({ message: "profile was updated successfully." });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating profile with id=" + err
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Profile.findByIdAndRemove(id)
    .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
            });
        } else {
            res.send({
            message: "Product was deleted successfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Product with id=" + id
        });
    });
};

exports.deleteAll = (req, res) => {
    Profile.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Product were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all Profile."
        });
    });
};