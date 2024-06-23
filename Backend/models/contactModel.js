import mongoose from "mongoose";

const contactschema = new mongoose.Schema({
    name : {type:String , required:true},
    email : {type:String , required:true},
    concern : {type:String , required:true},
    
})


const contactModel = mongoose.models.contact || mongoose.model("contact" , contactschema)

export default contactModel;