import express from 'express'
import { postConcern } from '../controllers/contactContoller.js';


// make router 

const contactRouter = express.Router();


contactRouter.post("/" , postConcern);

export default contactRouter;