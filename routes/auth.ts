import express,{Request,Response} from 'express';
import Joi from 'joi';
import { User } from '../models/user';
import bcrypt from 'bcrypt';


const router = express.Router();

router.post('/', async (req: Request,res: Response) => {
    try {

        const {error} = validateUser(req.body);

        if (error) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        //Get User from database or any data source
        let user = new User({
            id: "User_1",
            username: "User_1",
        });

        const salt = await bcrypt.genSalt(10); // Simulating password for demo purposes
        user.password = await bcrypt.hash("password", salt);

        const validatePassword = await bcrypt.compare(req.body.password, user.password);

        if (!validatePassword) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Generate auth token
        const token = user.generateAuthToken();

        res.status(200).json({
            message: 'Authentication successful',
            token: token,
            user: {
                id: user.id,
                username: user.username
            }
        });
        
        
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        
    }
});


function validateUser(user:any){
    const schema = Joi.object({
        userName: Joi.string().min(3).max(255).required(),
        password: Joi.string().min(6).max(255).required()
    });

    return schema.validate(user);

}

export default router;