const db = require("../../models");
const Products = db.products;
const site = require("../../middleware/site");
const rand = require("../../library/randomString")

exports.index = (req, res) => {
    site({ title: "Products", breadcrumb: [{"name":"Products", "url":"/admin/products"}]})
    res.render("admin/pages/products/index")
};

exports.data_table = async(req, res) => {
    const txtsrc = req.body.search.value;
    const limit = parseInt(req.body.length)
    const page =  parseInt(req.body.start);
    criteria = { title: { $regex: new RegExp(txtsrc), $options: "i" } }
    await Products.find(criteria).skip(0).limit(0).then(async data => {
        data = data.map(function(dt_){
            dt_.description = dt_.description.substring(0,100) + " ..."
            return dt_
        })
        let dataCount = await Products.find(criteria)
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

exports.add = async (req, res) => {
    if (Object.keys(req.body).length > 0){
        let randName = rand(20)
        if(req.files) {
            let imgProd = req.files.pic;
            let extName = imgProd.name.split('.').pop();
            randName = randName + "." + extName;
            imgProd.mv('./assets/public/products/' + randName);
        }

        const cat = new Products({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            pic: randName,
            categoryId: req.body.opt_category,
            published: req.body.published ? req.body.published : false
        });
        // console.log(cat)
        // Save Tutorial in the database
        await cat.save(cat).then(data => {

        }).catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Product."
            });
        });

        res.redirect("/admin/products")
    }else{
        site({ title: "Products", breadcrumb: [
            {"name":"Products", "url":"/admin/products"},
            {"name":"Add", "url":"/admin/products/add", "active":true}
        ]})
        res.render("admin/pages/products/add")
    }
}

exports.update = async(req, res) => {
    const id = req.params.id;
    if (Object.keys(req.body).length > 0){
        let randName = rand(20)
        if(req.files) {
            let imgProd = req.files.pic;
            randName = randName + "." + imgProd.type;
            imgProd.mv('./assets/public/products/' + randName);
            req.body.pic = randName
        }else{
            delete req.body.pic
        }
        let dataUpdate = {...req.body, categoryId: req.body.opt_category }
        await Products.findByIdAndUpdate(id, dataUpdate, { useFindAndModify: false });
        res.redirect("/admin/products")
    }else{
        site({ title: "Products", breadcrumb: [
            {"name":"Products", "url":"/admin/products"},
            {"name":"Edit", "url":"/admin/products/update/{id}", "active":true}
        ]})
        let Product = await Products.findById(id)
        //console.log(Product)
        res.render("admin/pages/products/edit", { Product })
    }
}

exports.detail = async(req, res) => {
    const id = req.params.id;

    var data = await Products.findById(id)

    site({ title: "Products", breadcrumb: [
        {"name":"Products", "url":"/admin/products"},
        {"name":"Detail", "url":"/admin/products/{id}", "active":true}
    ]})
    res.render("admin/pages/products/detail", { data })
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