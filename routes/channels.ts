import express,{Request,Response} from 'express';
import {Channel} from '../models/channel';
import auth from '../middleware/auth';
import { wss, wsUsers } from '..';
import { User } from '../models/user';
import { extractUser } from '../middleware/extractUser';
import { ChannelEventType } from '../types/events/channel';


const router = express.Router();

const channels:Channel[] = [
    new Channel({
        id: '1',
        title: 'General',
        description: 'A channel for general discussions'
    }),
    new Channel({
        id: '2',
        title: 'Technology',
        description: 'A channel for technology-related discussions'
    }),
    new Channel({
        id: '3',
        title: 'Random',
        description: 'A channel for random topics'
    })
];


router.get('/',[auth],async (req:Request,res:Response) => {
    try {
        res.status(200).json(channels);
    } catch (error) {
        console.error('Error fetching channels:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/',[auth,extractUser], async (req:Request,res:Response) => {
    try {

        let channel = new Channel({
            id: req.body.id,
            title: req.body.title,
            description: req.body.description
        });

        const result = channel.validateChannel();
        
        if(result.error){
            return res.status(400).json({message: "Invalid Channel Data", details: result.error.details.map(detail => detail.message)});
        }

        if(channels.find(c => c.id == channel.id)){
            return res.status(400).json({ message: 'Channel with this ID already exists' });
        }

        channels.push(channel);
        res.status(201).json(channel);

        console.log("Listner Count", wss.clients.size);

        for (const [wsUserId, ws] of wsUsers.entries()) {
            if (wsUserId === req.user?.id) {
                ws.send(JSON.stringify({
                    type: ChannelEventType.CHANNEL_CREATE,
                    channel: channel
                }));
                break; 
            }
        }

        
    } catch (error: any) {
        console.error('Error creating channel:', error);
        res.status(500).json({ message: error.message });
    }
});






export default router;