import foodModel from '../models/foodmodel.js'
import fs from 'fs'


// add food items 


const addFood = async (req,res) => {
        let image_filename = `${req.file.filename}`
    
        const food = new foodModel({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            category:req.body.category,
            image:image_filename
    
        })
        try {

            //using food.save method , the items will be saved in to the database
            await food.save();
            res.json({success:true,message:"Food Added"})
        } catch (error) {
            console.log(error)
            res.json({success:false,message:"Error"})
        }
    }


// List fooditems 
const listFood = async (req , res) =>{
    try {
        const foods = await foodModel.find({})
        res.json({succesee: true , data : foods})
    } catch (error) {
        console.log("Error");
        res.json({succesee : false , message : "Error"})
    }
}

const removeFood = async (req , res) =>{
    try {
        // Find that particulat collcetion or say foodItem based on the id 
        const foodItem = await foodModel.findById(req.body.id);

        //Now as we get the item we will ge the name of the image too thus we need to delete it from the public/uploades folder too 
        fs.unlink(`public/uploads/${foodItem.image}` , () =>{

        })

        // Now we need to delete that recorde from the database too
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({succesee : true , message : "Deleted"})

    } catch (error) {
        
        res.json({succesee : false , message : "Error"})
    }
} 
export {addFood , listFood  , removeFood}