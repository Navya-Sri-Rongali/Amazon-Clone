import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { data22 } from "../App.js";
import { Link } from "react-router-dom";

import "./Adminsignin.css";
function Adminsignin() {
  
  const [usertextin, setusertextin] = useState({
    email: "",
    password: "",
  });
  
  const submithandler = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/adminlogin", {
        email: usertextin.email,
        password: usertextin.password,
      })
      .then((res) => {
        console.log("data obtained from response:", res);
        localStorage.setItem("AdminToken",res?.data?.Admintoken);
        console.log("The token after loggin in  ", res?.data?.Admintoken);
        if (res?.data?.Admintoken !== null) {
          window.location.replace("/allitems");
          alert("Admin signed Successfully🙌!");
        }
        else {
          alert("Admin signin Failed,need to register first🙌!");
        }
      })
      .catch((err) => {
          alert("Please register first")
      });
    
  };

  return (
    <div>
      
      <center>
        
        <h2>Signin as Admin</h2>
        <form onSubmit={submithandler}>
          <div>
            <input
              className="aininput"
              type="text"
              placeholder="email"
              value={usertextin.email}
              onChange={(e) => {
                setusertextin({ ...usertextin, email: e.target.value });
              }}
            ></input>
          </div>
          <div>
            <input
              type="text"
              className="aininput"
              placeholder="password"
              value={usertextin.password}
              onChange={(e) => {
                setusertextin({ ...usertextin, password: e.target.value });
              }}
            ></input>
          </div>
          <button className="ainbutton">submit</button>
        </form>
        <div>
          Don't have an Account?
          <Link to="/adminregister">AdminRegister</Link>
        </div>
      </center>
    </div>
  );
}

export default Adminsignin;
