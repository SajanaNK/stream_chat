"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
const joi_1 = __importDefault(require("joi"));
const channelSchema = {
    id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for the channel'
    },
    title: {
        type: 'string',
        description: 'Title of the channel'
    },
    description: {
        type: 'string',
        description: 'Description of the channel'
    },
};
class Channel {
    constructor({ id, title, description }) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
    validateChannel() {
        const schema = joi_1.default.object({
            id: joi_1.default.string().required(),
            title: joi_1.default.string().required(),
            description: joi_1.default.string().optional()
        });
        return schema.validate(this, { abortEarly: false });
    }
}
exports.Channel = Channel;
//# sourceMappingURL=channel.js.map