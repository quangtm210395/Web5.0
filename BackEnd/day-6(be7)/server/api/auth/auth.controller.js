var User = require('../user/user.model');

module.exports = {
    login: (req, res) => {
        User.findOne({username: req.body.username})
            .exec((err, user) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({status:false, msg: err});
                }
                if (!user) res.status(404).json({status: false, msg: "This account is not register"});
                else {
                    if (user.authenticate(req.body.password)) {
                        res.status(202).json({status: true, msg: "Login successful"});
                    }
                    else {
                        res.status(403).json({status: false, msg: "Password incorrect"});
                    }
                }

            })
    }
}