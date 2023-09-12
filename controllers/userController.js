//bring in prisma and cookie 

const prisma = require("../prisma/index.js");
const cookieToken = require("../utils/cookieToken.js");

//user signup
exports.signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        //check
        if (!name || !email || !password) {
            throw new Error("please provide all fields");
        }
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })

        //send user a token
        cookieToken(user, res);

    } catch (error) {
        throw new Error(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error("Please enter email and password");
        }
        //find a user based on email
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        //if user with the provided email does not exists
        if (!user) {
            throw new Error("No user with this email exists.");
        }
        //if password provided by user does not matches
        if (user.password !== password) {
            throw new Error("Invalid email or password");
        }

        cookieToken(user, res);
    } catch (error) {
        throw new Error(error);
    }
}

exports.logout = (req, res, next) => {
    try {
        res.clearCookie("token");
        res.json({
            success: true
        })
    } catch (error) {
        throw new Error(error);
    }
}
