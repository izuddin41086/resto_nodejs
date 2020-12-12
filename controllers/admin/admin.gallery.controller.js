const db = require("../../models");
const Gallery = db.gallery;
const rand = require("../../library/randomString")
const fs = require('fs')

exports.create = async (req, res, next) => {
    let id_product = req.params.id
    if(req.files) {
        if (Array.isArray(req.files.theFiles) == false){
            req.files.theFiles = [req.files.theFiles]
        }
        req.files.theFiles.forEach(async(img) => {
            let randName = rand(20)
            let extName = img.name.split('.').pop();
            randName += "." + extName;
            img.mv('./assets/public/images/gallery/' + randName);
            const gallery = new Gallery({
                title: "Ini adalah judul",
                description: "Ini adalah deskripsinya",
                pic: randName,
                id_product: id_product,
                is_profile: 0,
                published: req.body.published ? req.body.published : false
            });

            await gallery.save(gallery).then(data => {

            }).catch(err => {

            });
        });
    }
    res.redirect("/admin/products/"+id_product)
};

exports.data_table = async(req, res) => {
    const txtsrc = req.body.search.value;
    const limit = parseInt(req.body.length)
    const page =  parseInt(req.body.start);
    let criteria = { title: { $regex: new RegExp(txtsrc), $options: "i" } }
    if (req.body.id_product){
        criteria = {  id_product: req.body.id_product }
    }

    await Gallery.find(criteria).skip(page).limit(limit).then(async data => {
        data = data.map(function(dt_){
            dt_.pic = '/site_assets/images/gallery/' + dt_.pic
            return dt_
        })
        let dataCount = await Gallery.find(criteria)
        return res.json({
            "recordsTotal": dataCount.length,
            "recordsFiltered": dataCount.length,
            "data": data
        })
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving profile."
        });
    });
}

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
            message: `Cannot update Product Image with id=${id}. Maybe Tutorial was not found!`
        });
    } else res.send({ message: "Product Image was updated successfully." });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Product Image with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Gallery.findByIdAndRemove(id)
    .then(data => {
        fs.unlinkSync('./assets/public/images/gallery/' + data.pic)
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

exports.set_profile = async (req, res, next) => {
    const id = req.params.id;
    const idProduct = req.body.id_product
    await Gallery.updateMany({ id_product: idProduct }, { is_profile: 0 });
    //console.log(id, idProduct)
    await Gallery.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
    if (!data) {
        res.status(404).send({
            message: `Cannot update Product Image with id=${id}. Maybe Tutorial was not found!`
        });
    } else res.send({ message: "Product Image was updated successfully." });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Product Image with id=" + id
        });
    });
}