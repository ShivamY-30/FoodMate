import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "https://foodmate-f45t.onrender.com/"
    const [cartobj , setcartobj] = useState({});
    // const [token,setToken] = useState("");
    // const [food_list,setFoodList] = useState([])
   

    const token = localStorage.getItem("Token");

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token){
            const response = await axios.post(url+"api/cart/addtocart",{itemId},{headers:{token}})
            // console.log("Add" , response);
            // console.log("Token" , token);
            // console.log("Called");
        }
    }

    

    const fetch = async () =>{
        // http://localhost:8000/api/cart/fetchtocart
            const response = await axios.post(url + "api/cart/fetchtocart" ,{},{headers:{token}})
            const carts = response.data.cartData
            return carts;
            // console.log("Called");
    
    }

    useEffect(()=>{
        async function loadData() {
            if (localStorage.getItem("token")) {
                await fetch();
            }
        }
        loadData();
    },[])

   


    const removeFromCart =  (itemId) => {
       
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            const response =  axios.post(url+"api/cart/removetocart",{itemId},{headers:{token}})
            console.log("Remove ");
            return response;

        }
    }


    const addCartItems = (itemId) =>{
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }

    

    const test = () =>{
        return "Hello";
    }
    const getUniqueItemCount = () => {
        return Object.keys(cartItems).length;
    };


    const contextValue = {
        cartItems:cartItems,
        addToCart,
        removeFromCart,
        test : test,
        fetchCartData : fetch,
        addCartItems:addCartItems,
        getUniqueItemCount:getUniqueItemCount,
        url : url,
        token:token,
        
    }

    return (
        <StoreContext.Provider value={contextValue}>
            <>
            {props.children}
            </>
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
