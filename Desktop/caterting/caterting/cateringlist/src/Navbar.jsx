import React, { useEffect, useState } from "react";
import "./NavbarStyle.css";
import { MenuItems } from "./Menuitems";
import { Link } from "react-router-dom";
import Trip1 from "./logo.png";
const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [Name, setName] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const getcurrentUserData = () => {
    try {
      const userDataString = JSON.parse(localStorage.getItem("userData")) || "";
      console.log(userDataString.name, "000000");
      setName(userDataString.name);
    } catch (error) {
      setName("not show");
    }
  };
  useEffect(() => {
    getcurrentUserData();
  }, []);
  const logoutfunction = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="NavbarItems">
      <h1 className="Navbar-logo">
        <img src={Trip1} alt="image" style={{
          width:"80px"
        }} />
      </h1>
      <div className="menu-icons" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => (
          <>
            <li key={index}>
              <Link className={item.cName} to={item.url}>
                <i className={item.icon}></i>
                {item.title}
              </Link>
            </li>
          </>
        ))}
         <button onClick={logoutfunction}>Logout</button>
        <Link to={'/profile'} >{Name}</Link >
      </ul>
    </nav>
  );
};

export default Navbar;
