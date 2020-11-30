'use strict'
const db = require("../../models");
const Products = db.products;
const Profile = db.profile;

var sess;

exports.confirmOrder = async (req, res, next) => {
    const idProduct = req.body.idProduct;
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

    const Product = await Products.findById(idProduct).then(data => {
        return data
    }).catch(err => {
        console.log(err)
        return false
    })
    var bodyPost = req.body
    bodyPost.total_order = bodyPost.jumlah_order * Product.price

    var waOrder = `Assalamualaykum ${cProfile.name}, mau order nih
    Nama Produk: ${Product.title}
    Nama Pemesan: ${bodyPost.cust_name}
    Email Pemesan: ${bodyPost.email}
    Telepon: ${bodyPost.phone}
    Tgl Pengiriman: ${bodyPost.date_picker}
    Waktu: ${bodyPost.time_picker}
    Alamat Pengiriman: ${bodyPost.address}
    Total Harga: ${Intl.NumberFormat().format(bodyPost.total_order)}`;

    var waOrderTemplate = encodeURIComponent(waOrder);

    res.render("pages/confirm_order",{ Product, cProfile , bodyPost, waOrderTemplate, onePage: true});
}