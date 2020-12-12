const db = require("../../models");
const Gallery = db.gallery;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Tutorial
    const gallery = new Gallery({
        title: req.body.title,
        description: req.body.description,
        pic: req.body.pic,
        id_product: req.body.id_product,
        published: req.body.published ? req.body.published : false
    });

    // Save Tutorial in the database
    gallery
      .save(gallery)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Product."
        });
      });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Gallery.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Gallery."
        });
    });
};

exports.findAllPublished = (req, res) => {
    Gallery.find({ published: true })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving Gallery."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Gallery.findById(id)
    .then(data => {
    if (!data)
        res.status(404).send({ message: "Not found Gallery with id " + id });
    else
        res.send(data);
    })
    .catch(err => {
    res
        .status(500)
        .send({ message: "Error retrieving Gallery with id=" + id });
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
        message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Gallery.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
    if (!data) {
        res.status(404).send({
        message: `Cannot update Product with id=${id}. Maybe Tutorial was not found!`
        });
    } else res.send({ message: "Product was updated successfully." });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Product with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Gallery.findByIdAndRemove(id)
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
    Gallery.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Product were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all products."
        });
    });
};