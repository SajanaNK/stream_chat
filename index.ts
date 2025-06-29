import express from 'express';
import health from './routes/health';
import channels from './routes/channels';
import auth from './routes/auth';
import {WebSocketServer, WebSocket} from 'ws'
import { User } from './models/user';
import {URL} from 'url';


const PORT = 3000;
const WEBSOCKET_PORT = 8080;


const app = express();
const wss = new WebSocketServer({ port: WEBSOCKET_PORT },() => {
    console.log(`WebSocket server started on port ${WEBSOCKET_PORT}`);
});

const wsUsers = new Map<string, WebSocket>();


app.use(express.json());
app.use("/health",health);
app.use("/channels",channels);
app.use("/login", auth);

const server = app.listen(PORT, () => {
    console.log('Server started on port 3000');
});

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

// WebSocket server setup
wss.on('connection',async (ws,req) => {

    // const origin = req.headers.origin;

    //  if (origin !== 'http://localhost:8080/') {
    //     ws.close(); // Or handle unauthorized origin
    //     return;
    // }

    const query = new URL(req.url ?? '', `http://${req.headers.host}`).searchParams;
    const token = query.get('token');
    if(!token){
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
    })

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



export { server, wss,wsUsers };

