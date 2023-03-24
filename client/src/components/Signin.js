import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { redirect } from "react-router-dom";
import Card from "./Card";
import "./signin.css";
import Cartsingleproduct from "./Cartsingleproduct";
export const useremail = createContext();
function Signin() {
  const [checkemail,setemail]=useState(null)
  const [usertextin, setusertextin] = useState({
    email: "",
    password: "",
  });
  const [user, setuser] = useState(null);
  const submithandler = async (e) => {
    e.preventDefault();
    console.log("The email and Password is  : ", usertextin.email, usertextin.password);
    await axios
      .post("http://localhost:5000/login", {
        email: usertextin.email,
        password: usertextin.password,
      })
      .then((res) => {
        console.log("data obtained from response:", res);
        localStorage.setItem("Token", res?.data?.token);
        if (res?.data?.token === undefined) alert("Please register")
        else {
          alert("Loggedin Successfully")
          window.location.replace("/allitems");
        }
      })
      .catch((err) => {
        console.log("This error occured in sigin as user")
      });
      
  };

  return (
    <div>
      
      <center>

        <h2>Sign in as User</h2>
        <form onSubmit={submithandler}>
          <div>
            <input
              className="ininput"
              type="text"
              placeholder="email"
              value={usertextin.email}
              onChange={(e) => {
                setusertextin({ ...usertextin, email: e.target.value });
                setemail(e.target.value);
                
              }}
            ></input>
          </div>
          <div>
            <input
              type="text"
              className="ininput"
              placeholder="password"
              value={usertextin.password}
              onChange={(e) => {
                setusertextin({ ...usertextin, password: e.target.value });
              }}
            ></input>
          </div>
          <button className="inbutton">submit</button>
        </form>
        <div>
          Don't have an Account?
          <Link to="/register">Register</Link>
        </div>
      </center>
      
    </div>
  );
}

export default Signin;
