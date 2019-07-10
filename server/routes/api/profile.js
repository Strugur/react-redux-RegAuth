const express = require("express");
const router = express.Router();
const session = require('express-session')
const User = require('../../models/User.js');

//Check if user is login
router.get('/',async (req,res)=>{
    if(!req.session.userId){
    res.status(401).send(false);
    // res.redirect("/login");
}else{

    var user = await User.findOne({_id:req.session.userId});
    res.send({
        username:user.username,
        isAuth:true
    });
}

});
//LOG OUT
router.get('/logout',async (req,res)=>{
   
    await  req.session.destroy((err)=>{
     res.clearCookie('sid')
         res.send();
     });
     
 
     });
 



module.exports = router;