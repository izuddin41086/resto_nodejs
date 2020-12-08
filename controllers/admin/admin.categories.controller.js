const db = require("../../models");
const Categories = db.categories;
const site = require("../../middleware/site");

exports.index = (req, res) => {
    site({ title: "Categories", breadcrumb: [{"name":"Categories", "url":"/admin/categories"}]})
    res.render("admin/pages/categories/index")
};

exports.data_table = async(req, res) => {
    const txtsrc = req.body.search.value;
    const limit = parseInt(req.body.length);
    const page =  parseInt(req.body.start);
    criteria = { title: { $regex: new RegExp(txtsrc), $options: "i" } }
    await Categories.find(criteria).skip(page).limit(limit).then(async data => {
        let dataCount = await Categories.find(criteria)
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

exports.add = (req, res) => {
    if (Object.keys(req.body).length > 0){
        const cat = new Categories({
            title: req.body.name,
            description: req.body.description,
            published: req.body.published ? req.body.published : false
        });

        // Save Tutorial in the database
        cat.save(cat).then(data => {
            //res.send(data);
        }).catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Product."
            });
        });

        res.redirect("/admin/categories")
    }else{
        site({ title: "Categories", breadcrumb: [
            {"name":"Categories", "url":"/admin/categories"},
            {"name":"Add", "url":"/admin/categories/add", "active":true}
        ]})
        res.render("admin/pages/categories/add")
    }
}

exports.update = async(req, res) => {
    const id = req.params.id;
    if (Object.keys(req.body).length > 0){
        await Categories.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
        res.redirect("/admin/categories")
    }else{
        site({ title: "Categories", breadcrumb: [
            {"name":"Categories", "url":"/admin/categories"},
            {"name":"Edit", "url":"/admin/categories/update/{id}", "active":true}
        ]})
        let Category = await Categories.findById(id)
        res.render("admin/pages/categories/edit", { Category })
    }
}

exports.detail = async(req, res) => {
    const id = req.params.id;

    var data = await Categories.findById(id)

    site({ title: "Categories", breadcrumb: [
        {"name":"Categories", "url":"/admin/categories"},
        {"name":"Detail", "url":"/admin/categories/{id}", "active":true}
    ]})
    res.render("admin/pages/categories/detail", { data })
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Categories.findByIdAndRemove(id)
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
            });
        } else {
            res.send({
                message: "Category was deleted successfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Category with id=" + id
        });
    });

};

exports.showList = async (req, res, next) =>{
    await Categories.find().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving profile."
        });
    });
}