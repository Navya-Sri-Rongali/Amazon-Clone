import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import BasicRating from "./Rating.js";
import { totalsum, addprod, subprod } from "./Cart.js";
import { Basket } from "../App.js";
import axios from "axios";


function Card({ prod }) {
  
  const cart = useContext(Basket);
  const tot = useContext(totalsum);
  const [usercheck, setusercart] = useState([]);
  const carthandler = () => {
    // cart[1]([...cart[0], prod]);
    axios.post("http://localhost:5000/updatecart", {
      body: {
        email: localStorage.getItem('Token'),
        product:prod
      }
    }).then((res) => {
      cart[1](res.data.dbcart)
    })
      
  }
  useEffect(() => {
    axios.post("http://localhost:5000/getcart", {
      body: {
        email:localStorage.getItem('Token')
      }
    }).then((res) => {
      cart[1](res.data)
    })
  },[])
  console.log("The product is card: ", prod?.productid);
  return (
    <div className="whole_product">
      <Link to={`/${prod?.productid}`}>
        {(prod?.image) ?
          (<img
            src={prod?.image}
            width="200px"
            height="200px"
            className="product_images"
          ></img>) : (<></>)}
      </Link>
      {/* {prod?.name ?
        (< div className="product_name"> {prod?.name}<div />:(<></>)} */}
          {prod?.price ?
            (<div>
            <div className="product_price">Rs: {prod?.price} /-</div>
      <BasicRating /></div>):(<></>)}
      {cart[0]?.includes(prod) ? (
        <button></button>
      ) : (
        <button
          className="addtocartbutton"
          onClick={() => {
            carthandler();
          }}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default Card;
