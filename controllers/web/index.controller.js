'use strict'
const db = require("../../models");
const Products = db.products;
const Profile = db.profile;
const Gallery = db.gallery;

var sess;

exports.index = async (req, res, next) => {
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
    var cProfile = sess.profile
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    const ProductList = await Products.find(condition).then(data => {
        data.forEach(async(prod) => {
            let gal = await Gallery.find({ id_product: prod.id, is_profile: 1 })
            prod.pic = gal[0].pic
        })
        return data
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving products."
        });
    });

    const galleryMap = [8,4,4,4,4,4,8,4,4,4];
    const cGallery = await Gallery.find(condition).then(data => {
        return data;
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving products."
        });
    });

    res.render("index", { ProductList, cProfile, cGallery, galleryMap });
}