const bcrypt = require('bcrypt');
const { apiErrorResponse, HTTP_STATUS } = require('./responseHelper');
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10; // Default to 10 if SALT_ROUNDS is not defined


// Function to hash passwords
const hashPasswords = async (users) => {
    try {
        for (const user of users) {
            const salt = await bcrypt.genSalt(SALT_ROUNDS);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;
        }
    } catch (err) {
        console.error('Error hashing passwords:', err);
        throw err; // Throw error to handle in calling function
    }
};

const generateSlug = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 -]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/-+$/g, ''); // Remove trailing -
};

const checkFollowers = (req, res, next) => {
    try {
        
        if (10000 > req.body.followers) {
            console.log("first enough followers")
            return apiErrorResponse(res, "Followers is not enough", null, HTTP_STATUS.FORBIDDEN); 
        }
        next()
    } catch (error) {
        return apiErrorResponse(res, "Followers is not enough", error.message, HTTP_STATUS.FORBIDDEN);

    }

}

module.exports = {
    hashPasswords,
    generateSlug,
    checkFollowers
};
