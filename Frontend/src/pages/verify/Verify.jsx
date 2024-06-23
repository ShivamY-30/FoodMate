import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../Store/StoreContextProvider';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();
    
    const verifyPayment = async () => {
        try {
            // console.log("Verifying payment with success:", success, "orderId:", orderId);
            const response = await axios.post(url + "api/order/verify", { success, orderId });
            console.log("Response from verify API:", response.data.success);
            if (response.data.success) {
                navigate("/myorders");
                // console.log(response.data);

            } else {
                navigate("/"); // Ensure this is the correct path
                // console.log("Myorder");
                // console.log(response.data); 
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            // Handle error (e.g., show an error message or redirect to an error page)
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []); // Empty dependency array to run once on mount

    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    );
};

export default Verify;
