import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import { Provider, useSelector } from "react-redux";
import store from "./Store/index.js";
import './routes/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Verify from "./pages/verify/Verify.jsx";
import MyOrders from "./pages/myorders/MyOrders.jsx";
import Contact from "./pages/Contact/Contact.jsx";


// Router Creation
const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order",
        element: <PlaceOrder />,
      },
      // Fallback to Home component for unmatched paths
     
    ],
  },
  {
    path: "/verify",
    element: <App />,

    children: [
      {
        path: "",
        element: <Verify />,
      },
    ]
  },
  {
    path: "/myorders",
    element: <App />,

    children: [
      {
        path: "",
        element: <MyOrders />,
      },
    ]
  },
  {
    path: "/contact",
    element: <App />,

    children: [
      {
        path: "",
        element: <Contact />,
      }
      ]
  }
]);


// Theme Component
const ThemedApp = () => {
  const isDarkMode = useSelector((store) => store.theme.isDarkMode); 

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
        <ThemedApp />
    </Provider>
  </React.StrictMode>
);
