const session = require('express-session');
const User = require('../models/User');

const registerUser = async (session, firstName, lastName, email, password) => {
    const user = new User({
        firstName,
        lastName,
        email,
        hashedPassword: password
    });

    try {
        await user.save();

        session.user = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
    } catch (err) {
        return err;
    }
}

const loginUser = async (session, email, password) => {
    const user = await User.findOne({ email });

    if (user) {
        try {
            await user.comparePassword(password)

            session.user = {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        } catch (err) {
            return Promise.reject('Incorect username or Password')
        }
    } else {
        return Promise.reject('Incorect username or Password')
    }
}

const logout = (session) => {
    delete session.user;
}

const getUserById = async (id) => {
    return JSON.parse(JSON.stringify((await User.find({ _id: id }))[0]));
}



module.exports = {
    registerUser,
    loginUser,
    logout,
    getUserById
}