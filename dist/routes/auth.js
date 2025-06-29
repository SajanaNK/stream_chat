"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        //Get User from database or any data source
        let user = new user_1.User({
            id: "User_1",
            username: "User_1",
        });
        const salt = await bcrypt_1.default.genSalt(10); // Simulating password for demo purposes
        user.password = await bcrypt_1.default.hash("password", salt);
        const validatePassword = await bcrypt_1.default.compare(req.body.password, user.password);
        if (!validatePassword) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        // Generate auth token
        const token = user.generateAuthToken();
        res.status(200).json({
            message: 'Authentication successful',
            token: token,
            user: {
                id: user.id,
                username: user.username
            }
        });
    }
    catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
function validateUser(user) {
    const schema = joi_1.default.object({
        userName: joi_1.default.string().min(3).max(255).required(),
        password: joi_1.default.string().min(6).max(255).required()
    });
    return schema.validate(user);
}
exports.default = router;
//# sourceMappingURL=auth.js.map