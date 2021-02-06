import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
// models
import UserModel from '../models/User.js';

const SECRET_KEY = process.env.SECRET_KEY;

export const encode = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await UserModel.getUserById(userId);
        const payload = {
            userId: user._id,
            userType: user.type,
        };
        const authToken = jwt.sign(payload, SECRET_KEY);
        console.log('Auth', authToken);
        req.authToken = authToken;
        next();
    } catch (error) {
        return res.status(400).json({ success: false, message: error.error });
    }
};

export const decode = async (req, res, next) => {
    if (!req.headers['authorization']) {
        return res
            .status(400)
            .json({ success: false, message: 'No access token provided' });
    }
    const accessToken = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(accessToken, SECRET_KEY);
        req.userId = decode.userId;
        req.userType = decode.type;
        return next();
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
};
