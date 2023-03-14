import React, { useContext, useState, useEffect, createContext } from "react";
import { Basket } from "../App.js";
import Cartsingleproduct from "./Cartsingleproduct.js";
import Singleproduct from "./Singleproduct.js";
import "./Cart.css";
import Card from "./Card.js";
import Header from "./Header";
import axios from "axios";

export const totalsum = createContext();
export const addprod = createContext();
export const subprod = createContext();
//igore above
function Cart() {
  const cart = useContext(Basket);
  const [total, settotal] = useState(0);
  useEffect(() => {
    settotal(cart[0].reduce((acc, cur) => acc +cur.price, 0));
  }, [cart[0]]);
  
  useEffect(() => {
    axios
      .post("http://localhost:5000/getcart", {
        body: {
          email: localStorage.getItem("Token"),
        },
      })
      .then((res) => {
        cart[1](res.data);
      });
  }, [cart[0]]);
  return (
    <div>
      
      <div className="cart_total">Cart Total : {total}</div>
      <div className="all_cart_products">
        {cart[0]?.map((arg) => {
          console.log("Cart Arg:", arg);
          return (
            <div>
              <Cartsingleproduct prod={arg} />
              
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cart;
