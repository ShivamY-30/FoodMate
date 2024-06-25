import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assets } from "../../assets/assets";
import { MdAddShoppingCart } from "react-icons/md";
import { CartSliceAction } from "../../Store/CartSlice";
import "./FoodItems.css";

// Changes for add to cart in database 
import { useContext } from "react";
import { StoreContext } from '../../Store/StoreContextProvider'



const FoodItems = ({ id, name, description, price, image }) => {
  const url = "https://foodmate-f45t.onrender.com/";

  const {addToCart , removeFromCart} = useContext(StoreContext);

  const [cartitemss, setcartitemss] = useState([]);
  

  const dispatch = useDispatch();
  const cart = useSelector((store) => store.CartSlice);
  const token = useSelector((store) => store.token);

  // useEffect(() => {
  //   // console.log(ttoken);
  // }, [token]); 

  
  // useEffect(()=>{
  //   fetcher()
  // }, [cartitemss])

  const [itemCount, setItemCount] = useState(0);

  const addItemToCart = async (itemId) => {
    addToCart(itemId);
    };
    
  const removeItemFromCart = (itemId) => {
    // You would need a removeCartItems action in your CartSlice for this
    dispatch(CartSliceAction.removeCartItems({ id: itemId }));
    removeFromCart(itemId);
    

  };

  const incrementItemCount = () => {
    setItemCount(itemCount + 1);
    addItemToCart(id);
  };

  const decrementItemCount = () => {
    setItemCount(itemCount - 1);
    removeItemFromCart(id); // Assuming you have a corresponding action for removal
  };

  // http://localhost:8000/api/cart/addtocart


  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={url + "images/" + image} alt="" className="food-item-image" />
        {!itemCount ? (
          <MdAddShoppingCart
            className="add"
            style={{ width: "120px" }}
            onClick={incrementItemCount}
          />
        ) : (
          <div className="food-item-counter">
            <img
              className="addon"
              src={assets.remove_icon_red}
              alt=""
              onClick={decrementItemCount}
            />
            <b>{itemCount} </b>
            <img
              className="addon"
              src={assets.add_icon_green}
              alt=""
              onClick={incrementItemCount}
            />
          </div>
        )}
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
          </div>
          <p className="food-item-desc">{description}</p>
          <p className="food-item-price">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItems;
