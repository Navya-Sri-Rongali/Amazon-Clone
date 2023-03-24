import React, { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Header.css";
import {Store} from '../App.js';
import  {Basket}  from "../App.js";
import { Link } from 'react-router-dom'
import Inselectform from './Inselectform.js'

function Header() {
  const cart = useContext(Basket);
  
  console.log("header cart len:",cart[0]);
  return (
    <div className="header">
      <Link to="/allitems" className="amazon_logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png"
          width="100px"
          height="50px"
        />
      </Link>
      <div className="total_search_bar">
        <input className="inside_search_bar"></input>
        <SearchIcon />
      </div>
      <div className="selectform">
        <Inselectform />
      </div>
      <Link to="/cart">
        <div className="total_cart">
          <ShoppingCartIcon className="only_cart" /> 
          <span className="no_of_items">{cart[0]?.length}</span>
        </div>
      </Link>
    </div>
  );
}

export default Header;

