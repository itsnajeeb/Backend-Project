const jwt = require("jsonwebtoken");
const User = require('../model/user.model')
module.exports.signupValidator = (req, res, next) => {
    const { name, email, username, password, bio } = req.body;
    if (!name || !email || !username || !password || !bio) {
        return res.status(401).json({
            success: false,
            message: "All fields are required"
        });
    }
    else {
        next()
    }
}
module.exports.loginValidator = (req, res, next) => {

    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(401).json({
            success: false,
            message: "All Fileds are required",
        })
    }
    next()
}

module.exports.authenticateUser = async (req, res, next) => {

    try {
        const token = req.cookies?.token || null;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Authentication Failed"
            })
        }
        const decode = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(decode.id).select('-password')
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found OR your coupon expired",
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
        next()
    }

    catch (e) {
        return res.status(401).json({
            success: false,
            Error: e.message
        })
    }
}
