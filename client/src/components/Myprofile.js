import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
function Myprofile() {
    const [mydata, setmydata] = useState(null);
    const [myreviews, setmyreviews] = useState([]);
    
    useEffect(async () => {
      await axios
        .get("https://localhost:5000/allusers", {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log("dashboar response:", res.data);
          setmydata(res.data);
        });
    }, []);
    if (!localStorage.getItem("token")) {
      window.location.replace("/signin");
    }
  return (
      <div>
          <h4>{mydata?.username}</h4>
          <div>email:{mydata?.email}</div>
          <div>
              { myreviews? 
                  myreviews?.map(arg => {
                      return (<div>
                          {arg.review}
                      </div>)
                  }):(<div>NO review given yet</div>)
              }
          </div>
    </div>
  )
}

export default Myprofile