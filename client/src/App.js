import React, { useEffect, useState, createContext } from "react";

import "./App.css";
import Register from "./components/Register";
import Signin from "./components/Signin";
import Adminregister from "./components/Adminregister";
import Adminsignin from "./components/Adminsignin";
import { Link } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Myprofile from "./components/Myprofile.js";
import Indprofile from "./components/Indprofile.js";
import Additem from "./components/Additem";
import Allitems from "./components/Allitems.js";
import Header from "./components/Header.js";
import Cart from "./components/Cart";
import Singleproduct from "./components/Singleproduct";
import Card from "./components/Card";
import Cartsingleproduct from "./components/Cartsingleproduct";
import Frontpage from "./components/Frontpage";

export const data1 = createContext();
export const Store = createContext();
export const data22 = createContext();
export const Basket = createContext();
function App() {
  const [cart, setcart] = useState([]);
  const [data, setdata] = useState([]);
  return (
    <Store.Provider value={[data, setdata]}>
      <Basket.Provider value={[cart, setcart]}>
        <div className="App">
          <Routes>
            <Route path="/" exact element={<Frontpage />}></Route>
          </Routes>
          <Header />
          <Routes>
            <Route path="/allitems" exact element={<Allitems />}></Route>
            <Route path="/register" exact element={<Register />}></Route>
            <Route path="/signin" exact element={<Signin />}></Route>
            
            <Route path="/adminsignin" exact element={<Adminsignin />}></Route>
            <Route path="/dashboard" exact element={<Dashboard />}></Route>
            <Route path="/myprofile" exact element={<Myprofile />}></Route>
            <Route
              path="/Indprofile/:username/:email/:_id"
              exact
              element={<Indprofile />}
            ></Route>
            <Route path="/additem" exact element={<Additem />}></Route>

            <Route path="/Cart" exact element={<Cart />}></Route>
            <Route path="/:text" exact element={<Singleproduct />}></Route>
            <Route
              path="/Cart/:text"
              exact
              element={<Cartsingleproduct />}
            ></Route>
          </Routes>
        </div>
      </Basket.Provider>
    </Store.Provider>
  );
}

export default App;
