const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is require"],
        maxlength: [50, "Name not grether then 50 characher"],
        minlength: [5, "Name must be atleast 5 character"],
        trim: true
    },
    username: {
        type: String,
        required: true,
        maxlength: [20, "Username not be grether then 20 character "],
        minlength: [5, "Username atleast 5 character"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, "Please enter a valid email"], // ✅ optional email validation
    },
    password: {
        type: String,
        select: false,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],

    },
    bio: {
        type: String,
        maxlength: [100, "Your bio not be grether then 100 character "],
        trim: true
    },
}, { timestamps: true })


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    try {
        this.password = await bcrypt.hash(this.password, 10)
        return next()
    }
    catch (err) {
        next(err)
    }
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id, username: this.username }, process.env.SECRET, { expiresIn: '24h' })

    return token
}


const userModel = mongoose.model('User', userSchema);


module.exports = userModel;

