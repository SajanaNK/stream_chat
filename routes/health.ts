import express from 'express';


const router = express.Router();

router.get('/',(req,res) => {
    res.status(200).json({ status: 'ok' });
});

router.get('/timestamp',(req,res) => {
    res.status(200).json({ timestamp: new Date().toISOString() });
})



export default router;