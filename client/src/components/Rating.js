// import React, { useState } from 'react'
// import { AiFillStar, AiOutlineStar } from "react-icons/ai"
// import './Rating.css'
// function Rating() {
//    const[stars,setstars] =useState(0)
//   return (
//     <div>
//         {
//             [...Array(5)].map((_,i)=>{
//                 return (<span onClick={()=>setstars(i+1)}>
//                     {stars > i ? (<AiFillStar className="fillstar" />):(<AiOutlineStar className="outlinestar"/>)

//                     }
//                 </span>)
//             })
//         }
//     </div>
//   )
// }

// export default Rating
import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function BasicRating() {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      
    </Box>
  );
}
