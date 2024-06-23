import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets.js";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ImCart } from "react-icons/im";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { clearToken, setToken } from "../../Store/tokenSlice.js";
import { toggle } from "../../Store/theme.js";
import { IoCart } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { StoreContext } from "../../Store/StoreContextProvider.jsx";
import { useContext } from "react";

const Navbar = ({ setshowLogin }) => {
  const handleScrollToMenu = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const token = useSelector((store) => store.token.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { getUniqueItemCount } = useContext(StoreContext);

  useEffect(() => {
    const savedToken = localStorage.getItem("Token");

    if (savedToken) {
      dispatch(setToken(savedToken));
    }
  }, [dispatch]);

  const logout = () => {
    localStorage.removeItem("Token");
    dispatch(clearToken());
    navigate("/");
  };

  const [selected, setSelected] = useState("Home");
  const mode = useSelector((store) => store.theme.isDarkMode);

  const cartObj = useSelector((store) => store.CartSlice);
  const numberItems = Object.keys(cartObj);
  const len = numberItems.length;

  return (
    <div className={`navbar ${mode ? "dark-mode" : "light-mode"}`}>
      <Link className="custom-link" to={`/`}>
        <img src={assets.logo11} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <li
          onClick={() => setSelected("Home")}
          className={selected === "Home" ? "active" : ""}
        >
          <Link className="custom-link" to={`/`}>
            Home
          </Link>
        </li>
        <li
          onClick={() => setSelected("menu")}
          className={selected === "menu" ? "active" : ""}
        >
          <Link onClick={handleScrollToMenu} className="custom-link">
            Menu
          </Link>
        </li>
        <li
          onClick={() => setSelected("Contact")}
          className={selected === "Contact" ? "active" : ""}
        >
          <Link className="custom-link" to={`/contact`}>
            Contact-Us
          </Link>
        </li>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to={"/cart"}>
            <ImCart size={30} />
          </Link>
        </div>
      </div>
      {!token ? (
        <button onClick={() => setshowLogin(true)}>Sign in</button>
      ) : (
        <div className="navbar-profile">
          <FaRegUser size={25} />
          <ul className="nav-profile-dropdown">
            <li onClick={() => navigate("/myorders")}>
              <IoCart size={25} />
            </li>
            <hr />
            <li onClick={logout}>
              <IoLogOutOutline size={25} />
            </li>
          </ul>
        </div>
      )}
      {mode ? (
        <CiLight
          size={35}
          onClick={() => dispatch(toggle())}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <MdDarkMode
          size={35}
          onClick={() => dispatch(toggle())}
          style={{ cursor: "pointer" }}
        />
      )}
    </div>
  );
};

export default Navbar;
