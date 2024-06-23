import express from 'express'
import { addtocart , removetocart , fetchtocart } from '../controllers/cartContoller.js'
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();



cartRouter.post("/addtocart" , authMiddleware, addtocart);
cartRouter.post("/removetocart" ,  authMiddleware,  removetocart);
cartRouter.post("/fetchtocart" ,  authMiddleware,  fetchtocart);

export default cartRouter;