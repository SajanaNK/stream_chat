"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wsUsers = exports.wss = exports.server = void 0;
const express_1 = __importDefault(require("express"));
const health_1 = __importDefault(require("./routes/health"));
const channels_1 = __importDefault(require("./routes/channels"));
const auth_1 = __importDefault(require("./routes/auth"));
const ws_1 = require("ws");
const url_1 = require("url");
const PORT = 3000;
const WEBSOCKET_PORT = 8080;
const app = (0, express_1.default)();
const wss = new ws_1.WebSocketServer({ port: WEBSOCKET_PORT }, () => {
    console.log(`WebSocket server started on port ${WEBSOCKET_PORT}`);
});
exports.wss = wss;
const wsUsers = new Map();
exports.wsUsers = wsUsers;
app.use(express_1.default.json());
app.use("/health", health_1.default);
app.use("/channels", channels_1.default);
app.use("/login", auth_1.default);
const server = app.listen(PORT, () => {
    console.log('Server started on port 3000');
});
exports.server = server;
// WebSocket server setup
wss.on('connection', async (ws, req) => {
    // const origin = req.headers.origin;
    //  if (origin !== 'http://localhost:8080/') {
    //     ws.close(); // Or handle unauthorized origin
    //     return;
    // }
    const query = new url_1.URL(req.url ?? '', `http://${req.headers.host}`).searchParams;
    const token = query.get('token');
    if (!token) {
        console.error('No token provided in the query parameters');
        ws.close(1008, 'Authentication required'); // Close with a specific code
        return;
    }
    console.log();
    ws.send('Welcome to the WebSocket server!');
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        // Broadcast the message to all connected clients
        wss.clients.forEach(client => {
            if (client.readyState === client.OPEN) {
                client.send(`Server received: ${message}`);
            }
        });
    });
    ws.on('open', () => {
        console.log('WebSocket connection opened');
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
    ws.on('error', (error) => {
        console.error(`WebSocket error: ${error}`);
    });
    // get userId from user token
    const userId = token;
    wsUsers.set(userId, ws);
});
process.on('SIGINT', () => {
    console.log('Shutting down...');
    server.close(() => console.log('HTTP server closed'));
    wss.close(() => console.log('WebSocket server closed'));
    process.exit();
});
//# sourceMappingURL=index.js.map