"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const channel_1 = require("../models/channel");
const auth_1 = __importDefault(require("../middleware/auth"));
const __1 = require("..");
const extractUser_1 = require("../middleware/extractUser");
const router = express_1.default.Router();
const channels = [
    new channel_1.Channel({
        id: '1',
        title: 'General',
        description: 'A channel for general discussions'
    }),
    new channel_1.Channel({
        id: '2',
        title: 'Technology',
        description: 'A channel for technology-related discussions'
    }),
    new channel_1.Channel({
        id: '3',
        title: 'Random',
        description: 'A channel for random topics'
    })
];
router.get('/', [auth_1.default], async (req, res) => {
    try {
        res.status(200).json(channels);
    }
    catch (error) {
        console.error('Error fetching channels:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.post('/', [auth_1.default, extractUser_1.extractUser], async (req, res) => {
    try {
        let channel = new channel_1.Channel({
            id: req.body.id,
            title: req.body.title,
            description: req.body.description
        });
        const result = channel.validateChannel();
        if (result.error) {
            return res.status(400).json({ message: "Invalid Channel Data", details: result.error.details.map(detail => detail.message) });
        }
        if (channels.find(c => c.id == channel.id)) {
            return res.status(400).json({ message: 'Channel with this ID already exists' });
        }
        channels.push(channel);
        res.status(201).json(channel);
        console.log("Listner Count", __1.wss.clients.size);
        for (const [wsUserId, ws] of __1.wsUsers.entries()) {
            if (wsUserId === req.user?.id) {
                ws.send(JSON.stringify({
                    type: 'channel_created',
                    channel: channel
                }));
                break;
            }
        }
        // wss.clients.forEach(client => {
        //     if (client.readyState === client.OPEN) {
        //         client.send(JSON.stringify({
        //             type: 'channel_created',
        //             channel: channel
        //         }));
        //     }
        // });
    }
    catch (error) {
        console.error('Error creating channel:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=channels.js.map