"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
async function run() {
    const salt = await bcrypt_1.default.genSalt(10);
    const hashed = await bcrypt_1.default.hash('1234', salt);
    console.log(salt);
    console.log(hashed);
}
run();
//# sourceMappingURL=hash.js.map