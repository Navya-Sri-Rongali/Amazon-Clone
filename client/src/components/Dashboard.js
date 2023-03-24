import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Dashboard() {
    const [arrdata, setarrdata] = useState([]);
    
    useEffect(() => {
        console.log(localStorage.getItem("Token"))
    axios
        .get("http://localhost:5000/allusers", {
            headers: {
                token: localStorage.getItem("Token")
          }
      })
      .then((res) => {
        console.log("dashboar response:", res.data);
        setarrdata(res.data);
      });
  }, []);
  if (!localStorage.getItem("Token")) {
    window.location.replace("/signin");
  }
  return (
    <div>
      <div>
        {arrdata.length >= 1
          ? arrdata.map((arg) => {
              return (
                <div>
                  <img />
                  <h4>User:{arg.username}</h4>
                  <div>email: {arg.email}</div>
                  <Link
                    to={`/indprofile/${arg.username}/${arg.email}/${arg._id}`}
                  >
                    Individual profile
                  </Link>
                </div>
              );
            })
          : null}
      </div>
      <Link to="/myprofile">My profile</Link>
      <Link to="/signin" onSubmit={localStorage.removeItem("token")}>
        LogOut
      </Link>
    </div>
  );
}

export default Dashboard;
