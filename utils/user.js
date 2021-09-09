const bcrypt = require("bcryptjs");

const User = require("../models/user");

const findUserData = async(userId) => {
    try {
        const user = await User.findById(userId);
        return { 
            ...user._doc,
            password: null,
        }
    } catch(err) {
        console.log(`ERROR: ${err}`);
        throw err;
    }
}

const findAllUsers = () => User.find();

const findUserByEmail = (email) => {
    if (!email) return null;

    return User.findOne({ email });
}

const findUserById = (id) => User.findById(id);

const createNewUser = async(email, password) => (
    new User({
        email,
        password: await bcrypt.hash(password, 12)
    })
);

module.exports = {
    findUserData,
    findAllUsers,
    findUserByEmail,
    findUserById,
    createNewUser
};