import jwt from 'jsonwebtoken';
import {WebSocket} from 'ws';

interface UserProps{
    id: string;
    username: string;
    email?: string;
    remoteAddress?: string;
}


class User {
    id:string;
    username:string;    
    email?:string;
    remoteAddress?: string;
    password?: string;

    constructor({id, username, email, remoteAddress }: UserProps) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.remoteAddress = remoteAddress;
    }

     generateAuthToken(): string {
        const token = jwt.sign({
            _id: this.id,
        }, "myKey");
        return token;
    }

    
}

export { User, UserProps };