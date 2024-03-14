const User = require("../Models/userModel");
const { createSecretToken } = require("../util/secretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
    try {
        const { password, username } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }
        const user = await User.create({ password, username });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res
            .status(201)
            .json({ message: "User signed in successfully", success: true, user });
        next();
    } catch (error) {
        console.error(error);
    }
};

module.exports.Login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if(!username || !password ){
            return res.json({message:'All fields are required'})
        }
        const user = await User.findOne({ username });
        if(!user){
            return res.json({message:'Incorrect password or username' })
        }
        const auth = await bcrypt.compare(password,user.password)
        if (!auth) {
            return res.json({message:'Incorrect password or username' })
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(201).json({ message: "User logged in successfully", success: true });
        next()
    } catch (error) {
        console.error(error);
    }
}

