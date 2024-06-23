import contactModel from "../models/contactModel.js";

const postConcern  = async (req ,res) =>{
    let {name , email , concern} = req.body;
    
    const contact = new contactModel({
        name : name,
        email : email,
        concern : concern,
    })

    try {
        //using food.save method , the items will be saved in to the database
        await contact.save();
        res.json({success:true,message:"Concern Submitted"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}


export {postConcern};