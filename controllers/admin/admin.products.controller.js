const db = require("../../models");
const Products = db.products;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Tutorial
    const product = new Products({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        pic: req.body.pic,
        published: req.body.published ? req.body.published : false
    });

    // Save Tutorial in the database
    product
      .save(product)
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
    res.render("admin/pages/products")
};

exports.findAllPublished = (req, res) => {
    Products.find({ published: true })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving products."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Products.findById(id)
    .then(data => {
    if (!data)
        res.status(404).send({ message: "Not found Product with id " + id });
    else
        res.send(data);
    })
    .catch(err => {
    res
        .status(500)
        .send({ message: "Error retrieving Product with id=" + id });
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
        message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Products.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

    Products.findByIdAndRemove(id)
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
    Products.deleteMany({})
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