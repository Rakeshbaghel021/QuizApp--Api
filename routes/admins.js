var express = require('express');
var router = express.Router();
var Admin = require("../models/admin");
var jwt = require('jsonwebtoken');
const AdminAuth = require("../middleware/AdminAuth");
const logged = AdminAuth.validToken;

// signup for admin

router.post('/signup',(req,res,next)=>{
    Admin.create(req.body,(err,createdAdmin)=>{
        if(err) return next(err);
        res.json({createdAdmin});
    })
})

// signin for admin

router.post('/signin',(req,res)=>{
    Admin.findOne({email:req.body.email},(err,admin)=>{
        if(err) return res.json({err});
        if(!admin) return res.json("invalid email");
        if(!admin.matchPassword(req.body.password)){
            res.send("wrong password");
        }


//jwt

        jwt.sign({adminName:admin.adminName,adminId:admin._id,email:admin.email},"topsecret",(err,token)=>{
            if(err) return res.json({success:false,msg:"token not generated"})
            res.json({token});
          })
    })
})



  
    
module.exports = router;