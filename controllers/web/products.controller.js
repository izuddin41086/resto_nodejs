'use strict'
const db = require("../../models");
const Products = db.products;
const Profile = db.profile;

var sess;

exports.detail = async (req, res, next) => {
    const id = req.params.id;
    sess = req.session
    if (sess.profile == "" || sess.profile == undefined){
        sess.profile = await Profile.find().then(data => {
            return data[0]
        }).catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving Profile."
            });
        });
    }
    const cProfile = sess.profile

    const Product = await Products.findById(id).then(data => {
        return data
    })
    .catch(err => {
        console.log(err)
        return false
    })

    res.render("pages/product",{ Product, cProfile , onePage: true, id});
}