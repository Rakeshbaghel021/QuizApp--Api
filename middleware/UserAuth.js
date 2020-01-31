const jwt = require("jsonwebtoken");

exports.validToken = (req,res,next)=>{
    var token = req.headers.authorization;
    if(token){
        jwt.verify(token,"topsecret",(err,payload)=>{
            if(err) return res.status(500).json({
                err,
                success:false,
                msg:"something went wrong"
            })
            req.user = payload;
            next()
        })
    } else{
        res.status(401).json({error:"token is required"})
    }
}