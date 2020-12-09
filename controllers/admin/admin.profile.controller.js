const db = require("../../models");
const Profile = db.profile;
const site = require("../../middleware/site");

exports.index = async (req, res) => {
    if (Object.keys(req.body).length > 0) {
        const id = req.body.id;
        await Profile.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            return data
        })
        .catch(err => {
            return false
        })
    }

    const data = await Profile.find().then(data => {
        return data[0]
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving profile."
        });
    });

    site({ title: "Settings", breadcrumb: "settings"})

    res.render("admin/pages/settings", { data } )
};