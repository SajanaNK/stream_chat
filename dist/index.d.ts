import { WebSocket } from 'ws';
import { User } from './models/user';
declare const wss: import("ws").Server<typeof import("ws"), typeof import("http").IncomingMessage>;
declare const wsUsers: Map<string, WebSocket>;
declare const server: import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>;
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
export { server, wss, wsUsers };
//# sourceMappingURL=index.d.ts.map