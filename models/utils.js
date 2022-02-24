const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    return bcrypt.hash(password, 9)
}

const comparePasswords = async(password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}

module.exports = {
    hashPassword,
    comparePasswords,
}