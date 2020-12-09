'use strict'
const db = require("../../models");
const Products = db.products;
const Gallery = db.gallery;
const Profile = db.profile;

var sess;

exports.confirmOrder = async (req, res, next) => {
    const idProduct = req.body.idProduct;
    sess = req.session
    //console.log(req.body)
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

    const Product = await Products.findById(idProduct).then(async(data) => {
        let gal = await Gallery.find({ id_product: idProduct, is_profile: 1 })
        data.pic = gal[0].pic
        return data
    }).catch(err => {
        console.log(err)
        return false
    })
    var bodyPost = req.body
    bodyPost.total_order = bodyPost.jumlah_order * Product.price

    var waOrder = "Assalamualaykum " + cProfile.name + ", saya pesan dengan rincian sbb:\r\n\r\n";
    waOrder += "Nama Pemesan: " + bodyPost.cust_name + "\r\n";
    waOrder += "Email Pemesan: " + bodyPost.email + "\r\n";
    waOrder += "Telepon: " + bodyPost.phone + "\r\n";
    waOrder += "Tgl Pengiriman: " + bodyPost.date_picker + "\r\n";
    waOrder += "Waktu: " + bodyPost.time_picker + "\r\n";
    waOrder += "Alamat Pengiriman: " + bodyPost.address + "\r\n";
    waOrder += "Nama Produk: " + Product.title + "\r\n";
    waOrder += "Harga Produk: " + Intl.NumberFormat().format(Product.price) + "\r\n";
    waOrder += "Jumlah Produk: " + bodyPost.jumlah_order + "\r\n";
    waOrder += "Total Harga: " + Intl.NumberFormat().format(bodyPost.total_order);

    var waOrderTemplate = encodeURIComponent(waOrder);

    res.render("pages/confirm_order",{ Product, cProfile , bodyPost, waOrderTemplate, onePage: true});
}