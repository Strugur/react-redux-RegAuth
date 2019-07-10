const express = require("express");
const router = express.Router();
const User = require('../../models/User.js');
const bcrypt = require("bcrypt");


router.get('/',(req,res)=>{
  if(req.session){
    // res.redirect("/profile");
    res.send({redirect:'profile'});
  }
  
});

router.post('/',async (req,res)=>{

let username = req.body.username;  
let password = req.body.password;


if(username.length <4 || username.length >20 ){
  res.status(400).send("errUserLength");
}else if (password.length <4 || password.length >20 ){
  res.status(400).send("errPassLength");
}

let user = await User.findOne({username:req.body.username});
let mail = await User.findOne({email:req.body.email});

if(user){
res.status(400).send("userExists");
}else if(mail){
  res.status(400).send("mailExists");
}else{
   let user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
   
});

let salt =  await bcrypt.genSalt(10);
user.password = await bcrypt.hash(user.password,salt);
await user.save();
res.status(200).send("registered");
}
});

module.exports = router;
