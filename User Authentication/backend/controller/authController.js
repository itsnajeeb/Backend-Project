const User = require('../model/user.model')
const bcrypt = require('bcrypt')
const signup = async (req, res) => {
    const { name, username, email, password, bio } = req.body

    // if (!name || !username || !email || !password || !bio) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "All fields are required"
    //     })
    // }

    try {

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already registered with this email"
            })
        }
        const isUsernameExist = await User.findOne({ username });

        if (isUsernameExist) {
            return res.status(401).json({
                success: false,
                message: "Username already exist"
            })
        }
        const newUser = new User(req.body)
        const result = await newUser.save();

        return res.status(201).json({
            success: true,
            data: result
        })

    }
    catch (e) {
        return res.status(401).json({
            success: false,
            message: e.message
        })
    }
}

const login = async (req, res) => {


    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ username }).select('+password');

        const isMatchPassword = await bcrypt.compare(password, user.password)

        if (!user || !isMatchPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            })
        }
        const token = user.generateAuthToken();
        const cookieOption = {
            maxAge: 24 * 60 * 60 * 100,
            httpOnly: true
        }
        res.cookie("token", token, cookieOption)

        return res.status(200).json({
            success: true,
            message: "You are successfull loggedin"
        })
    }
    catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })

    }
}
const profile = async (req, res, next) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User NOt Found or Token Expired"
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        })
    }
    catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}
module.exports = {
    signup,
    login,
    profile,
}