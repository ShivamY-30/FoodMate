import foodModel from "../models/foodmodel.js";
import userModel from "../models/userModel.js";

const addtocart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      // If that Item is not in cart then just make the value 1 so that item is in cart
      cartData[req.body.itemId] = 1;
    } else {
      // If that Item is in cart then just increment the count value of that item
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: " Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: "Error" });
  }
};

const removetocart = async (req, res) => {
  // res.send("Hello from removetocart")
  try {
    let userData = await userModel.findById(req.body.userId)
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId]>0) {
        cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData})
    res.json({success:true,message:"Removed From Cart"})
} catch (error) {
    console.log({success:false,message:"Error"});
}
};

const fetchtocart = async (req, res) => {
  try {
    // Assuming you're using Mongoose for MongoDB operations
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addtocart, removetocart, fetchtocart };
