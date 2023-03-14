import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import {Store} from '../App.js'
import './Singleproduct.css'
import { Basket } from "../App.js";
import Header from "./Header";

function Singleproduct({prod}) {
  const cart= useContext(Basket);
  const data=useContext(Store);
  console.log(data[0]);
  var { text } = useParams();
  console.log("text:",text)
  return (
    <div>
      <Header />
      {data[0].map((arg) => {
        if (arg.productid === text) {
          return (
            <center className="single_whole_product">
              <img src={arg.image} className="single_image" />
              <div className="single_name">{arg.productname} </div>
              <div className="single_price">Rs: {arg.price} /-</div>
              {cart[0]?.includes(prod) ? (
                <button
                  onClick={() =>
                    cart[1](
                      cart[0].filter(
                        (arg) => arg.productid !== prod.productid //important logic
                      )
                    )
                  }
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
            </center>
          );
        }
      })}
    </div>
  );
}

export default Singleproduct