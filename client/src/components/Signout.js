import axios from 'axios'
import React, { useEffect } from 'react'

function Signout() {
    useEffect(() => {
        axios.delete("http://localhost:5000/logout").then((res) => {
            localStorage.removeItem('res.token')
        })
    },[])
  return (
      <div>
          
    </div>
  )
}

export default Signout