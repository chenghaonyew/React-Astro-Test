import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { Link } from "react-router-dom";

function Header() {
  var myCurrentDate = new Date();
  var date =
    myCurrentDate.getDate() +
    "/" +
    (myCurrentDate.getMonth() + 1) +
    "/" +
    myCurrentDate.getFullYear();
  return (
    <div className="header">
      <div className="header_top">
        <div className="header_topLeft">
          <a href="/">Consumer</a>
          <a href="/">Business</a>
          <a href="/">Corporate</a>
          <a href="/">Brands</a>
        </div>
        <div className="header_topRight">
          <a href="/">
            <SearchIcon />
            <span>Search</span>
          </a>
          <a href="/">
            <PersonOutlineIcon />
            Login
          </a>
        </div>
      </div>
      <div className="header_bottom">
        <div className="header_bottomLeft">
          <Link to="/">
            <img
              src="https://static02.astro.com.my/astro/media/astromain/packagepromotion/astro_share_1.png"
              alt="ASTRO"
            />
          </Link>
          <a href="/">Products & Services</a>
          <a href="/">TV Guide</a>
          <a href="/">Promotions</a>
          <a href="/">My Account</a>
          <a href="/">Support</a>
        </div>
        <div className="header_bottomRight">
          <p>{date}</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
