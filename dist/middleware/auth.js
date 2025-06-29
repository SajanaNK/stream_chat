"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
async function auth(req, res, next) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = token; //jwt.verify(token, process.env.JWT_SECRET as string) as any;
        // Simulate user extraction from token
        const user = new user_1.User({
            id: decoded,
            username: `User_${decoded}`,
        });
        req.user = user;
        next();
    }
    catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
}
exports.default = auth;
//# sourceMappingURL=auth.js.map