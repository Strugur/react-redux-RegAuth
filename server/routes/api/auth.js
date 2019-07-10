const express = require("express");
const router = express.Router();
const User = require('../../models/User.js');
const bcrypt = require ("bcrypt");
const session = require('express-session')


router.post('/',async (req,res)=> {
    
const user = await User.findOne({username:req.body.username});

if(!user){
    return res.status(400).send();
}
const validPassword = await bcrypt.compare(req.body.password,user.password);

    if(!validPassword){
        return res.status(400).send();
    }
    req.session.userId = user._id;
    res.status(200).send();


});


module.exports = router;