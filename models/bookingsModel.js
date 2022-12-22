const mongoose= require("mongoose");

const bookingSchema=new mongoose.Schema({
bus:{
    type:mongoose.Schema.ObjectId,
    ref:"buses",
    required:true,
},
user:{
    type:mongoose.Schema.ObjectId,
    ref:"users",
    required:true,
},
seats:{
    type:Array,
    required:true,
},
transactionId:{
    type:String,
    required:true,
}
},{
    // i need to know when the tckets are booked..
    timestamps:true,
})

module.exports=mongoose.model("bookings",bookingSchema);