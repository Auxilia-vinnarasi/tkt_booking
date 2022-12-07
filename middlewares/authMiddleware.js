const jwt=require("jsonwebtoken");

module.exports=(req,res,next)=>{
    try{
//decode the token
const token=req.headers.authorization.split(" ")[1];
//first one bearer second one token so 1-index
//in that token we have to get the user id.using decrypt
//no token
if(!token){
    return res.status(401).send({
        message:"Auth failed",
        success:false,
    })
}
//validate token
const decoded=jwt.verify(token,process.env.jwt_secret);
//attach decoded userid in req.body
req.body.userId=decoded.userId;
//call next 
next()
    }
    catch(err){
        return res.status(401).send({
            message:"Auth failed",
            success:false,
        })
    }
}

//every protected routes u have to use this auth middleware..