import {NextFunction, Request,Response} from 'express';
import { User } from '../models/user';


async function auth(req: Request,res: Response,next: NextFunction) {
    try {

        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = token;  //jwt.verify(token, process.env.JWT_SECRET as string) as any;

        // Simulate user extraction from token
        const user: User = new User ({
            id: decoded,
            username: `User_${decoded}`,
        })

        req.user = user;

        next();
        
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
}

export default auth;