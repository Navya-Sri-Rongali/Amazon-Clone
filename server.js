const express = require("express");
const mongoose = require("mongoose");
const registeruser = require("./model.js");
const jwt = require("jsonwebtoken");
const port = 5000;
const app = express();
app.use(express.json());
const cors = require('cors');
const middleware = require('./middleware.js')
const userreview = require('./reviewmodel')
const items = require('./items.js')
const admin=require('./admins.js');
const admins = require("./admins.js");
const { findOne } = require("./model.js");
mongoose
  .connect(
    "mongodb+srv://Navya:Navya@cluster0.f2flhy9.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("mongo db connected"));
// mongoose.set("strictQuery", true);

app.use(cors({
  origin:'*', 
}))
app.get("/", (req, res) => {
  res.send("hi");
});
app.post("/register", async(req, res) => {
  try {
    const { username, email, password, confirm_password } = req.body;
    console.log("The data in register is : ", req.body);
    const exist = await registeruser.findOne({ email } ); 
    console.log("exist in regsiter:", exist);
    if (exist) {
      res.status(403).send("user already registered");
    }
    else if (password != confirm_password) {
      res.status(400).send("passowrds not matched"); //status any 400 is fail,200 is success
    }
    //otherwise save the user details
    else {
      console.log("email:", email);
      let newuser = new registeruser({
        username,
        email,
        password,
        confirm_password,
      });
      newuser.save();
    
      
      res.status(200).send("user successfully regsitered");
    }
    } catch (err) {
    console.log("error occurred:", err);
    res.status(500).send("server error");
  }
});

app.post("/login", async (req, res) => {
  // res.status(200).json(await registeruser.find()); 
  const { email, password } = req.body
  console.log(req.body.email)
  const exist = await registeruser.findOne({ email });
  console.log("This data is from login : ",exist);
  if (!exist) {
      res.send("user not registered,first you have to register");
    }
    else if (exist?.password != password) {
        res.send("login invalid,passwords not matched");
  }
  let payload = {
    user: {
      email: email
    },
  };
  jwt.sign(payload, "jwtPassword", { expiresIn: 20 }, (err, token) => {
    if (err) throw err;
    return res.json({ token });
  });
      
});

// //if user logged in then display all the items****************
app.get('/allitemsforuser', middleware,async (req, res) => {
  try {
    let checkuser = await registeruser.findById(req.user.id);
    if (checkuser) {
      res.status(200).json(await items.find());
    }
  }
  catch (err) {
    
  }
})


app.get("/allusers", async (req, res) => {//here only if we login we can access the userinfo,this can be done using middleware
  try {
    return res.status(200).send(await registeruser.find());
  }
  catch (err) {
    console.log(err);
  }
}
)
app.post('/update', async (req, res) => {
  try {
    let { email, dbcart } = req.body;
    test.registeruser.UpdateOne({email:email},{$set:{dbcart:dbcart}})
  }
  catch (err) {
    console.log(err);
  }
})
app.get("/myprofile",middleware, async (req, res) => {
  try {
    let profileuser = await registeruser.findById(req.user.id);
    return res.json(profileuser);
  }
  catch (err) {
    console.log(err);
  }
}
)
app.delete('/delete/:id', async (req, res) => {
  
  try {
    await registeruser.findByIdAndDelete(req.params.id)
    
    return  res.json(await registeruser.find()); 
  }
  catch (err) {
    console.log("err:", err);
  }
  
})

app.post('/addreview', middleware, async (req, res) => {//only loggedin people can give review to task worker so middle ware
  try {
    const { taskworker, review } = req.body;
    const exist = await registeruser.findById(req.user.id);
    let newreview = new userreview({ taskprovider: exist.username, taskworker, review });
    newreview.save();
    return res.status(200).send("review added successfully");

  }
  catch (err) {
    console.log("error in adding review:", err);
  }
})


app.get('/myreviews', middleware, async (req, res) => {
  try {
    let allreviews = await userreview.find();
    let myreview =allreviews.filter(re => re.taskworker.toString() === req.user.id.toString());
    return res.status(200).json(myreview);
  }
  catch (err) {
    res.status(400).send("err can not fetch your reviews");
  }
})



//for an admin regsiter and login
app.post("/adminregister", async (req, res) => {
  try {
    const { username, email, password} = req.body;
    console.log("The data in register is : ", req.body);
    const exist = await admin.findOne({ email });
    console.log("exist in regsiter:", exist);
    if (exist) {
      res.status(403).send("user already registered");
    }
    //otherwise save the user details
    else {
      let newadmin= new admin({
        username,
        email,
        password,
      });
      console.log("email:", email);
      newadmin.save();
      
      res.status(200).json(registeruser.find());
      // res.status(200).send("user successfully regsitered");
    }
  } catch (err) {
    console.log("error occurred:", err);
    res.status(500).send("server error");
  }
});
//admin login
app.post("/adminlogin", async (req, res) => {
  // res.status(200).json(await registeruser.find());
  const { email, password } = req.body;
  const exist = await admin.findOne({ email });
  console.log("This data is from login : ", exist);
  if (!exist) {
    res.status(402).send("user not registered,first you have to register");
  } else if (exist?.password != password) {
    res.status(402).send("login invalid,passwords not matched");
  }
  let payload = {
    user: {
      email:email
    },
  };
  jwt.sign(payload, "jwtPassword", { expiresIn: 36000000 }, (err, token) => {
    if (err) throw err;
    return res.json({ Admintoken:token });
  });
});

//adding an item
app.post('/additem', async (req, res) => {
  try {
    let { image, name, price, productid ,quantity} = req.body;
    console.log("The body from additempage: ",req.body)
    let newitem = new items({
      image, name, price, productid,quantity:0
    })
    
    newitem.save();
    console.log("All items in Additem : ",await items.find());
    return res.status(200).json(await items.find());
  }
  catch (err) {
    res.status(404).send("err admin not found ",err);
  }
  
  
  //dsplaying all items
  
  
})
//********************************************************************************************************************************************** *//
//********************************************************************************************************************************************** */
//********************************************************************************************************************************************* */
// app.post("/additemtocart", async (req, res) => {
//   try {
//     let {  quantity } = req.body;
//     console.log("The body from additempage: ", req.body);
//     let newitem = new items({
//       image,
//       name,
//       price,
//       productid,
//       quantity: 1,
//     });

//     newitem.save();
//     console.log("All items in Additem : ", await items.find());
//     return res.status(200).json(await items.find());
//   } catch (err) {
//     res.status(404).send("err admin not found ", err);
//   }
// });
// app.post("/:productid", async (req, res) => {
//   try {
//     let { quantity } = req.body;
//     console.log("The body from additempage: ", req.body);
//     let newitem = new items({
      
//       quantity
//     });

//     newitem.save();
//     return res.status(200).json(await items.findById(req.params.productid));
//   } catch (err) {
//     res.status(404).send("err admin not found ", err);
//   }

//   //dsplaying all items
// });


//************************************************************************************************************************************ */
//deleting an item by admin
app.get("/deleteitem/:id", async (req, res) => {
  try {
    
      await items.findByIdAndDelete(req.params.id);
      
      return res.json(await items.find());
    
    
  } catch (err) {
    console.log("err:");
  }
});
app.delete("/logout", middleware, async (req, res) => {
  try {
    

    return res.json({ token });
  } catch (err) {
    console.log("err:");
  }
});


// app.delete("/adminlogout",middleware, async (req, res) => {
//   try {
//     await registeruser.findByIdAndDelete(req.user.id);

//     return res.json({ Admintoken });
//   } catch (err) {
//     console.log("err:");
//   }
// });


app.get("/allitems", async (req, res) => {
  //here only if we login we can access the userinfo,this can be done using middleware
  console.log("Allitems");
  try {
    return res.status(200).json(await items.find());
  } catch (err) {
    console.log(err);
  }
}); 

//cart update function
app.post('/updatecart', async (req, res) => {
  let { email, product } = req.body.body;
  email = jwt.decode(email).user.email;
  var prevdb = await registeruser.findOne({ email: email })
  console.log("dbcarttttttttttt:", prevdb.dbcart);
  prevdb.dbcart.push(product);
  await registeruser.updateOne({ email: email }, {
    $set: {
      dbcart:prevdb.dbcart
    }
  })
  res.send({ dbcart: prevdb.dbcart });
  
})
app.post("/removefromcart", async (req, res) => {
  try {
    let { email, product } = req.body.body;
    let email1 = jwt.decode(email).user.email;
    console.log('product is :',product)
    let user = await registeruser.findOne({ email: email1 });
    let prevcart = user.dbcart;
    console.log('The prev cart is : ', prevcart.length);
    function Del(item) {
      return item.productid !== product.productid;
    }
    prevcart = prevcart.filter(Del);
    console.log('The prev cart-2 is : ', prevcart.length);
    await registeruser.updateOne({ email: email1 }, {
      $set: {
        dbcart:prevcart
      }
    })

  } catch (err) {
    console.log("err:",err);
  }
});
// Get cart
app.post('/getcart', async(req, res) => {
  let { email } = req.body.body;
  let email1 = jwt.decode(email).user.email;
  let user = await registeruser.findOne({ email: email1 });
  res.send(user?.dbcart)
})
app.listen(port, () => {
  console.log("server is listening to port", port);
});

