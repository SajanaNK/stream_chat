"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
router.get('/timestamp', (req, res) => {
    res.status(200).json({ timestamp: new Date().toISOString() });
});
exports.default = router;
//# sourceMappingURL=health.js.map