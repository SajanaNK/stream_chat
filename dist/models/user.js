"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class User {
    constructor({ id, username, email, remoteAddress }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.remoteAddress = remoteAddress;
    }
    generateAuthToken() {
        const token = jsonwebtoken_1.default.sign({
            _id: this.id,
        }, "myKey");
        return token;
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map