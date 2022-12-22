const router=require("express").Router();
const Bus=require("../models/busesModel");
const authMiddleware=require("../middlewares/authMiddleware");

//add-bus
router.post("/add-bus",async(req,res)=>{
    try{
        const existingBus=await Bus.findOne({number:req.body.number});

        if(existingBus){
            return res.status(500).send({
                success:false,
                message:"Bus already exist.."
            })
        }
        const newBus=new Bus(req.body);
        await newBus.save();
    
        return res.status(200).send({
            success:true,
            message:"Bus added successfully.."
        })

    }

    catch(err){
        console.log(err);
        
        return res.status(500).send({
            success:false,
            message:"Error: "+ err
        })

    }
   
})

//get all buses
router.post("/get-all-buses",authMiddleware,async(req,res)=>{
    try{
        // console.log(req.body.filters)
        // const buses=await Bus.find();
        // im sending route level obj itself ie why req.body
        const buses=await Bus.find(req.body)
        return res.status(200).send({
            success:true,
            message:"bus fetched successfully..",
            data: buses,
        })
    }
    catch(err){
        console.log(err)
            return res.status(500).send({
                success:false,
                message:"Error: " +err,
            
        })
    }
})

//update-bus
router.post("/update-bus",authMiddleware,async(req,res)=>{
    try{
        await Bus.findByIdAndUpdate(req.body._id,req.body);
        return res.status(200).send({
            success:true,
            message:"Bus Updated Successfully!..."
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            success:false,
            message:err.message,
        })
    }
})

//delete -bus
router.post("/delete-bus",authMiddleware,async(req,res)=>{
    try{
        await Bus.findByIdAndDelete(req.body._id);
        return res.status(200).send({
            success:true,
            message:"Bus deleted Successfully!.."
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            success:false,
            message:err.message,
        })
    }
})


//get-bus-by-id
router.post("/get-bus-by-id",authMiddleware,async(req,res)=>{
    try{
     const bus=await Bus.findById(req.body._id)
        return res.status(200).send({
            success:true,
            message:"bus fetched successfully!..",
            data:bus,
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            success:false,
            message:"Error: " +err,
        })
    }

})


module.exports=router;