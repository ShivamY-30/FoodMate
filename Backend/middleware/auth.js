// THis is nothing but a middleware that converts the token to id. So that we can perform add , remove ,fetch with the help of the id

import jwt from 'jsonwebtoken'


const authMiddleware = async(req , res ,next) =>{
    const {token} = req.headers;

    if(!token){
        return res.json({success : false , message : "Not Authorized! Login Again"})
    }

    try {
        const token_decoder =  jwt.verify(token , process.env.JWT_SECRET);
        req.body.userId = token_decoder.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success : false , message : "Error"})
        
    }

}

export default authMiddleware