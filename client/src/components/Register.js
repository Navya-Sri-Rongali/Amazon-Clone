
import React, { useEffect, useState ,createContext, useContext} from "react";
import axios from "axios";
import { data1 } from "../App.js";
import {Link} from 'react-router-dom'
import './Register.css'
function Register() {
    
    const [usertext, setusertext] = useState({
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    });
    const submithandler = (e) => {
      e.preventDefault();
      axios
        .post("http://localhost:5000/register", {
          username: usertext.username,
          email: usertext.email,
          password: usertext.password,
          confirm_password: usertext.confirm_password,
        })
      alert("User registered Successfully🙌");
        
    };
  
  return (
    <div>
      
      <center>
        
        <h2>Create an User Account</h2>
        <form onSubmit={submithandler}>
          <div className="register_input">
            <input
              className="rinput"
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
              className="rinput"
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
              className="rinput"
              type="text"
              placeholder="password"
              value={usertext.password}
              onChange={(e) => {
                setusertext({ ...usertext, password: e.target.value });
              }}
            ></input>
          </div>
          <div className="register_input">
            <input
              className="rinput"
              type="text"
              placeholder="confirm_password"
              value={usertext.confirm_password}
              onChange={(e) => {
                setusertext({ ...usertext, confirm_password: e.target.value });
              }}
            ></input>
          </div>
          <button className="rbutton">submit</button>
        </form>
        <br/>
        <div>Already have an account? 
          <Link to='/signin'>Sign in</Link>
        </div>
      </center>
    </div>
  );
}

export default Register