
import { useNavigate } from 'react-router-dom'; // Add this import
import './PlaceOrder.css';
import React, { useEffect } from 'react';  
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreContext } from '../../Store/StoreContextProvider';
import { useContext } from 'react';
import axios from 'axios';



const PlaceOrder = () => {

  const {url , token} = useContext(StoreContext)


  const food_list = useSelector((store) => store.food_list);
  // console.log(food_list);
  const { cartItems } = useContext(StoreContext);
  console.log(cartItems);


  const location = useLocation();
  const { subtotal, deliveryFee, total, cartItem } = location.state || {};

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  useEffect(()=>{
    // console.log(formData);
  },[formData])

  const placeOrder = async (event) => {
    event.preventDefault();
    console.log("Placing order...");
    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = {
          ...item,
          quantity: cartItems[item._id] 
        };
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: formData,
      items : orderItems,
      amount : total,
    }
    
    let response = await axios.post(url + "api/order/place" ,orderData,{headers:{token}})
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url)
    }else{
      alert("Error");
    }
  
    console.log(orderItems);
  
 
  };


  const navigate = useNavigate();
  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(subtotal === 0){
      navigate('/cart')
    }
  },[token])



  return (
      <form onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
          <p className='title'>Delivery Information</p>
          <div className="multi-fields">
            <input required name='firstName' onChange={onChangeHandler} value={formData.firstName} type="text" placeholder='First Name' />
            <input required name='lastName' onChange={onChangeHandler} value={formData.lastName} type="text" placeholder='Last Name' />
          </div>
          <input required name='email' onChange={onChangeHandler} value={formData.email} type="email" placeholder='Email address' />
          <input required  name='street' onChange={onChangeHandler} value={formData.street} type="text" placeholder='Street' />
          <div className="multi-fields">
            <input  required name='city' onChange={onChangeHandler} value={formData.city} type="text" placeholder='City' />
            <input required name='state' onChange={onChangeHandler} value={formData.state} type="text" placeholder='State' />
          </div>
          <div className="multi-fields">
            <input required name='zipcode' onChange={onChangeHandler} value={formData.zipcode} type="text" placeholder='Zip Code' />
            <input  name='country' onChange={onChangeHandler} value={formData.country} type="text" placeholder='Country' />
          </div>
          <input required name='phone' onChange={onChangeHandler} value={formData.phone} type="text" placeholder='Phone' />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${subtotal}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${subtotal === 0 ? 0 : 5}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${total}</b>
              </div>
            </div>
            <button type='submit'>PROCEED TO PAYMENT</button>
          </div>
        </div> 
      </form>
  );
};

export default PlaceOrder;