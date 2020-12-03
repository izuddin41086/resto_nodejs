exports.index = async(req, res) => {
    // Validate request
    res.redirect('/admin/login');
    //res.render("admin/index", { layout: 'admin/layout' })
};

exports.login = async(req, res) => {
    if (req.body.length > 0){
    }else{
        // Validate request
        res.render("admin/login", { layout: 'admin/auth_layout'  })
    }
};

exports.register = async(req, res) => {
    if (req.body.length > 0){
    }else{
        // Validate request
        res.render("admin/register", { layout: 'admin/auth_layout'  })
    }
};

exports.forgot = async(req, res) => {
    if (req.body.length > 0){
    }else{
        // Validate request
        res.render("admin/forgot", { layout: 'admin/auth_layout'  })
    }
};