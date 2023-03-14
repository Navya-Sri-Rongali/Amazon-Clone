import React, { useContext, useEffect, useState, createContext } from "react";
import Card from "./Card.js";
import axios from "axios";
import Cart from "./Cart.js";
import './Allitems.css'
import Singleproduct from "./Singleproduct.js";
import { Store } from '../App.js'
import Header from "./Header";

function Allitems() {
  const data = useContext(Store);
  // const [addeditems, setaddeditems] = useState([]);
  console.log("allitems now:", data[0]);
  const [checkadmintoken, setadmintoken] = useState(null);
  useEffect(() => {
    var token = localStorage.getItem("AdminToken");
    console.log("Allitems page : ", token);
    if (token) setadmintoken(token);
  }, []);
  const deletehandler = (arg) => {
    axios.get(`http://localhost:5000/deleteitem/${arg}`).then((res) => {
      data[1](res.data);
    });
  };
  useEffect(() => {
    axios.get("http://localhost:5000/allitems").then((res) => {
      data[1](res.data);
    });
  }, []);

  const addhandler = ()=>{
    window.location.replace('/additem');
  }
  return (
    <div className="all_products">
      
      {data[0]?.map((arg) => {
        return (
          <div className="card_data_container">
            {checkadmintoken && (
              <div>
                <button
                  className="add-del-plus"
                  style={{ color: "green" }}
                  onClick={() => {
                    addhandler();
                  }}
                >
                  +
                </button>
                <button
                  style={{ color: "red" }}
                  onClick={() => {
                    deletehandler(arg?._id);
                  }}
                  className="add-del-minus"
                >
                  -
                </button>{" "}
              </div>
            )}
            <Card prod={arg} />
          </div>
        );
      })}
    </div>
  );
}

export default Allitems;
