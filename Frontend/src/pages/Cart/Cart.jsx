import React, { useState, useEffect } from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { CartSliceAction } from "../../Store/CartSlice";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Store/StoreContextProvider";
import { useContext } from "react";

const Cart = () => {
  const url = "http://localhost:8000/";

  const { fetchCartData, removeFromCart } = useContext(StoreContext);

  const [cartData, setCartData] = useState(null); // State to hold cart data

  useEffect(() => {
    // Function to fetch cart data when the component mounts
    const fetchData = async () => {
      try {
        const data = await fetchCartData(); // Assuming fetchCartData returns a promise
        setCartData(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching cart data:", error);
        // Handle errors if needed
      }
    };

    fetchData(); // Call fetchData function when component mounts
  }, [fetchCartData]);

  const navigate = useNavigate();

  // Replace dummy data with useSelector for actual Redux state
  // const cartObj = useSelector((store) => store.CartSlice);
  const Items = useSelector((store) => store.food_list);

  // Calculate cart items based on cartData and Redux state
  let cartItems = [];
  if (cartData) {
    const keysArray = Object.keys(cartData);

    // Filter the items to include only those whose _id is in keysArray
    const filteredItems = Items.filter((item) => keysArray.includes(item._id));

    // Calculate total quantity for each item in the cart
    cartItems = filteredItems.map((item) => ({
      ...item,
      quantity: cartData[item._id], // Default to 0 if quantity is not defined
    }));
  }

  // Calculate subtotal, delivery fee, and total
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryFee = 5;
  const total = subtotal + deliveryFee;

  // Handler to remove an item from the cart
  const dispatch = useDispatch();
  const handleRemoveItemClick = (itemId) => {
    dispatch(CartSliceAction.removeCartItems({ id: itemId }));
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {cartItems.length > 0 ? (
          cartItems.map((item) =>
            item.quantity > 0 ? (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img
                    src={url + "images/" + item.image}
                    alt={item.title}
                    width="50"
                    height="50"
                  />
                  <p>{item.title}</p>
                  <p>${item.price}</p>
                  <p>{item.quantity}</p>
                  <p>${item.price * item.quantity}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            ) : null
          )
        ) : (
          <p>No items in the cart</p>
        )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{subtotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              {subtotal === 0 ? <p>$0</p> : <p>${deliveryFee}</p>}
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              {subtotal === 0 ? <p>$0</p> : <p>${total}</p>}
            </div>
          </div>
          <button
            onClick={() =>
              navigate("/order", {
                state: { subtotal, deliveryFee, total, cartItems },
              })
            }
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
