import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../../assets/frontend_assets/assets";
import { ThemeContext } from "../context/ThemeContext";
import {
  Home,
  Menu,
  Smartphone,
  Heart,
  Phone,
  ShoppingCart,
  User,
  Sun,
  Moon,
  HelpCircle,
  Utensils,
} from "lucide-react";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount } = useContext(StoreContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Handles smooth scroll or navigation for # links
  const handleNavMenuClick = (event, menuName, id) => {
    event.preventDefault();
    setMenu(menuName);
    if (id) {
      if (location.pathname !== "/") {
        localStorage.setItem("scrollToMenu", "true");
        navigate("/");
      } else {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Nav menu fragment to use in both desktop and mobile navbars
  const navMenu = (
    <>
      <Link
        to="/"
        onClick={() => setMenu("home")}
        className={`nav-item ${menu === "home" ? "active" : ""}`}
      >
        <Home size={18} />
        <span>Home</span>
      </Link>
      <Link
        to="/restaurants"
        onClick={() => setMenu("restaurants")}
        className={`nav-item ${menu === "restaurants" ? "active" : ""}`}
      >
        <Utensils size={18} />
        <span>Restaurant</span>
      </Link>
      <a
        href="#explore-menu"
        className={`nav-item ${menu === "menu" ? "active" : ""}`}
        onClick={e => handleNavMenuClick(e, "menu", "explore-menu")}
      >
        <Menu size={18} />
        <span>Menu</span>
      </a>
      <a
        href="#appdownload"
        className={`nav-item ${menu === "mobile-app" ? "active" : ""}`}
        onClick={e => handleNavMenuClick(e, "mobile-app", "appdownload")}
      >
        <Smartphone size={18} />
        <span>Mobile App</span>
      </a>
      <Link
        to="/wishlist"
        onClick={() => setMenu("wishlist")}
        className={`nav-item ${menu === "wishlist" ? "active" : ""}`}
      >
        <Heart size={18} />
        <span>Wishlist</span>
      </Link>
      <a
        href="#footer"
        className={`nav-item ${menu === "contact-us" ? "active" : ""}`}
        onClick={e => handleNavMenuClick(e, "contact-us", "footer")}
      >
        <Phone size={18} />
        <span>Contact</span>
      </a>
      <a
        href="#faq"
        className={`nav-item ${menu === "faq" ? "active" : ""}`}
        onClick={e => handleNavMenuClick(e, "faq", "faq")}
      >
        <HelpCircle size={18} />
        <span>FAQ</span>
      </a>
    </>
  );

  return (
    <>
      {/* Top Navigation Bar */}
      <div className={`navbar ${theme === "dark" ? "navbar-dark" : ""}`}>
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src={assets.foodie_icon} alt="app icon" className="app-icon" />
        </Link>
        {/* Desktop menu (center, hidden on mobile) */}
        <nav className="navbar-menu navbar-menu-desktop">
          {navMenu}
        </nav>
        {/* Right action buttons */}
        <div className="navbar-right">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="navbar-cart">
            <Link to="/cart" className="icon-button" aria-label="Go to cart">
              <ShoppingCart size={18} />
              {getTotalCartAmount() > 0 && <div className="cart-dot"></div>}
            </Link>
          </div>
          <button className="signin-button" onClick={() => setShowLogin(true)}>
            <User size={16} />
            <span>Sign In</span>
          </button>
        </div>
      </div>
      {/* Mobile bottom nav */}
      <nav className="navbar-menu-mobile">
        {navMenu}
      </nav>
    </>
  );
};

export default Navbar;
