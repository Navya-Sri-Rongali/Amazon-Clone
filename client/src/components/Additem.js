import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Additem.css";
import Allitems from "./Allitems.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from './Cart.js'

// export const basket = createContext();
function Additem() {
  
  
  const [usertext, setusertext] = useState({
    image: "",
    name: "",
    price: "",
    productid: "",
  });
  const submithandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/additem", {
        image: usertext.image,
        name: usertext.name,
        price: usertext.price,
        productid: usertext.productid,
      })
      .then((res) => {
        console.log("The data after additem; ", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      
      <center>
        
        <h2>Add an Item</h2>
        <form onSubmit={submithandler}>
          <div className="register_input">
            <input
              className="input"
              type="text"
              placeholder="image"
              value={usertext.image}
              onChange={(e) => {
                setusertext({ ...usertext, image: e.target.value });
              }}
            ></input>
          </div>
          <div className="register_input">
            <input
              className="input"
              type="text"
              placeholder="Product Name"
              value={usertext.name}
              onChange={(e) => {
                setusertext({ ...usertext, name: e.target.value });
              }}
            ></input>
          </div>
          <div className="register_input">
            <input
              className="input"
              type="text"
              placeholder="price"
              value={usertext.price}
              onChange={(e) => {
                setusertext({ ...usertext, price: e.target.value });
              }}
            ></input>
          </div>
          <div className="register_input">
            <input
              className="input"
              type="text"
              placeholder="ProductId"
              value={usertext.productid}
              onChange={(e) => {
                setusertext({ ...usertext, productid: e.target.value });
              }}
            ></input>
          </div>
          <button className="button">submit</button>
        </form>
        <br />
        
        
      </center>
      
    </div>
  );
}

export default Additem;
