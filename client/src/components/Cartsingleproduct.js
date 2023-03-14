import React,{useContext,useState,useEffect} from 'react'
import { Basket,Store } from "../App.js";
import {Link} from 'react-router-dom'
import './Cartsingleproduct.css'
import Header from "./Header";
import { totalsum ,addprod,subprod} from "./Cart";

import axios from 'axios';

function Cartsingleproduct({prod}) {
    const cart= useContext(Basket);
    const tot=useContext(totalsum);
 
  const deleteitem_from_dbcart = () => {
    axios.post("http://localhost:5000/removefromcart", {
      body: {
        email: localStorage.getItem('Token'),
        product:prod
      }
    })
    
  }
  return (
    <div className="cart_whole_product">
      
      <Link to={`/${prod?.productid}`}>
        <img
          src={prod?.image}
          width="200px"
          height="200px"
          className="cart_product_images"
        ></img>
      </Link>

      <div className="cart_product_name"> {prod?.productname}</div>
      <div className="cart_product_price">Rs: {prod?.price} /-</div>
      {cart[0]?.includes(prod) ? (
        <button
          onClick={() => {
            deleteitem_from_dbcart();
          }}
        >
          Remove from cart
        </button>
      ) : (
        <button
          className="cart_button"
          onClick={() => cart[1]([...cart[0], prod])}
        >
          {" "}
          Add to Cart{" "}
        </button>
      )}
    </div>
  );
}

export default Cartsingleproduct