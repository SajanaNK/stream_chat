"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractUser = extractUser;
async function extractUser(req, res, next) {
    try {
        next();
    }
    catch (error) {
        console.error('Error extracting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
//# sourceMappingURL=extractUser.js.map