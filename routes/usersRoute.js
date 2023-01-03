const router = require("express").Router();
const User = require("../models/usersModel");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const authMiddleware=require("../middlewares/authMiddleware");

//register new user:
router.post("/register", async (req, res) => {
  try {
    //if existing user
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.send({
        message: "User already exists",
        success: false,
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(200).send({
      message: "User created successfully..",
      success: true,
      data: newUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error: " + err,
      success: false,
      data:null
    });
  }
});

//login user
router.post("/login",async(req,res)=>{
  try{
    const userExists=await User.findOne({email:req.body.email});
    if(!userExists){
      return res.send({
        message:"user does not exist",
        success:false,
      })
    }
    //compare password with hashed password
    const passwordMatch=await bcrypt.compare(req.body.password,userExists.password);
    if(!passwordMatch){
      return res.send({
        message:"Incorrect password",
        success:false,
        data:null
      })
    }
    
    const token=jwt.sign({userId:userExists._id},process.env.jwt_secret,{
      expiresIn:"1d"
    })

    return res.send({
      success:true,
      message:" user Logged in successfully",
      data:token,
    })

  }
  catch(err){
    console.log(err);
    return res.status(500).send({
      message:"Error: " + err,
      success:false,
    })

  }
})

// get user by id
//we are getting token from the frontend
//we are sending only the token ..we dont know what is the userid.so we have to decrypt the token and we have to get the userid.
//for sending the token middlewares-->authMiddlewares.js

router.post("/get-user-by-id",authMiddleware,async(req,res)=>{
  //if u dont use the middleware u ll get only the token in req.body not the userid..
  try{
    const user=await User.findById(req.body.userId);
    return res.send({
      message:"User fetched successfully",
      success:true,
      data:user,
    })
  }
  catch(error){
    return res.send({
      message:"Error: " +error,
      success:false,
      data:null,
    })

  }
})
//not only get user by id , all the protected routes we have to use this authmiddleware..

//get-all-users
router.post("/get-all-users",authMiddleware,async(req,res)=>{
//   const getAllUsers=async(req,res)=>{
  try{
    const users=await User.find(req.body);
    return res.send({
      message:"User fetched successfully",
      success:true,
      data:users,
    })
  }
  catch(err){
    return res.send({
      message:err.message,
      success:false,
      data:null,
    })

  }
});

//update user
router.post("/update-user-permissions",async(req,res)=>{
// const updateUserPermissions=async(req,res)=>{
  try{
await User.findByIdAndUpdate(req.body._id,req.body)
return res.status(200).json({
  success:true,
  message:"user permissions updated successfully...",
  data:null,
})
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      success:false,
      message:"Error: " + err,
    })
  }
});

module.exports = router;
