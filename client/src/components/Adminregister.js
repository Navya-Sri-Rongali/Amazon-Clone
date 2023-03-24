import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import { data22 } from "../App.js";
import { Link } from "react-router-dom";

import "./Adminregister.css";
function Adminregister() {
  const [regdata,setregdata]=useState([])
  const [usertext, setusertext] = useState({
    username: "",
    email: "",
    password: "",
  });
  const submithandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/adminregister", {
        username: usertext.username,
        email: usertext.email,
        password: usertext.password,
      })
    alert("Admin registered Successfully🙌");
  };

  return (
    <div>
      
      <center>
        
        <h2>Registeras Admin</h2>
        <form onSubmit={submithandler}>
          <div className="register_input">
            <input
              className="arinput"
              type="text"
              placeholder="username"
              value={usertext.username}
              onChange={(e) => {
                setusertext({ ...usertext, username: e.target.value });
              }}
            ></input>
          </div>
          <div className="register_input">
            <input
              className="arinput"
              type="text"
              placeholder="email"
              value={usertext.email}
              onChange={(e) => {
                setusertext({ ...usertext, email: e.target.value });
              }}
            ></input>
          </div>
          <div className="register_input">
            <input
              className="arinput"
              type="text"
              placeholder="password"
              value={usertext.password}
              onChange={(e) => {
                setusertext({ ...usertext, password: e.target.value });
              }}
            ></input>
          </div>
          <button className="arbutton">submit</button>
        </form>
        <br />
        <div>
          Already have an account?
          <Link to="/Adminsignin">Sign in</Link>
          
        </div>
      </center>
    </div>
  );
}

export default Adminregister;
