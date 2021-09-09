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

const createNewUser = async(email, password) => {
    try {
        new User({
            email,
            password: await bcrypt.hash(password, 12)
        })
    } catch(err) {
        console.log(`ERROR: ${err}`);
        throw err;
    }
}

const validateUser = async(email, password) => {
    try {
        const user = await findUserByEmail(email);
        if (!user) throw new Error("User doesn't exist!");

        const hasCorrectPassword = bcrypt.compare(password, user.password, 12);
        if (!hasCorrectPassword) throw new Error("User email or password is incorrect!"); // ambiguous error message for user safety

        

    } catch(err) {
        console.log(`ERROR: ${err}`);
        throw err;
    }
}

module.exports = {
    findUserData,
    findAllUsers,
    findUserByEmail,
    findUserById,
    createNewUser,
    validateUser
};