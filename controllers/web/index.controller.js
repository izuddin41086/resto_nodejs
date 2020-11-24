'use strict'
const db = require("../../models");
const Products = db.products;

exports.index = async (req, res, next) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    const ProductList = await Products.find(condition).then(data => {
        return data;
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving products."
        });
    });

    res.render("index",{ ProductList });
}