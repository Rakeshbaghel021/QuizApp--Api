var express = require('express');
var router = express.Router();
var User = require("../models/user");
var jwt = require('jsonwebtoken');
const UserAuth = require("../middleware/UserAuth");
const logged = UserAuth.validToken;


// sign up

router.post('/signup',(req,res,next)=>{
  User.create(req.body,(err,createdUser)=>{
    if(err) return next(err);
    res.json({createdUser})
  })
})

// sign in

router.post('/signin',(req,res)=>{
  User.findOne({email:req.body.email},(err,user)=>{
    if(err) return res.json({err});
    if(!user) return res.json("inavlid email");
    if(!user.matchPassword(req.body.password)){
      res.send("wrong passowrd")
    }
//jwt

jwt.sign({username:user.username,userId:user._id,email:user.email},"jaishreeram",(err,token)=>{
  if(err) return res.json({success:false,msg:"token not generated"})
  res.json({token});
})

  })
})
// list of all users

router.get('/', (req,res,next)=>{
  User.find({}, (err,UserList)=>{
    if(err) return next(err);
    res.json(UserList);

  })
})

// get single user

router.get('/:id',(req, res, next)=>{
  User.findById(req.params.id , (err, SingleUser)=>{
    if(err) return next(err);
    res.json({SingleUser});
  })
})

// update user

router.put('/:id',(req,res,next)=>{
  User.findByIdAndUpdate(req.params.id, req.body,{new:true},(err, UpdateUser)=>{
    if(err) return next(err);
    res.json({UpdateUser})
  })
})

// update a part of user

router.patch('/:id',(req,res,next)=>{
  User.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,updatedUser)=>{
    if(err) return next(err);
    res.json({updatedUser});
  })
})

// delete user 

router.delete('/:id',(req,res,next)=>{
  User.findByIdAndDelete(req.params.id,(err,deletedUser)=>{
    if(err) return next(err);
    res.json({deletedUser});
  })
})

module.exports = router;
