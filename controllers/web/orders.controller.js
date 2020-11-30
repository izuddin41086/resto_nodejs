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

    var waOrder = `Assalamualaykum ${cProfile.name}, mau order nih %0D%0A
    Nama Produk: ${Product.title} %0D%0A
    Nama Pemesan: ${bodyPost.cust_name} %0D%0A
    Email Pemesan: ${bodyPost.email} %0D%0A
    Telepon: ${bodyPost.phone} %0D%0A
    Tgl Pengiriman: ${bodyPost.date_picker} %0D%0A
    Waktu: ${bodyPost.time_picker} %0D%0A
    Alamat Pengiriman: ${bodyPost.address} %0D%0A
    Total Harga: ${Intl.NumberFormat().format(bodyPost.total_order)}`;

    var waOrderTemplate = encodeURIComponent(waOrder)

    res.render("pages/confirm_order",{ Product, cProfile , bodyPost, waOrderTemplate, onePage: true});
}