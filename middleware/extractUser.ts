import { NextFunction, Request, Response } from "express";

export async function extractUser(req: Request,res: Response,next: NextFunction){
    try {

        

        next();
        
    } catch (error) {
        console.error('Error extracting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        
    }
}