const express=require("express");
require("dotenv").config();
const connectDB=require("./config/dbConfig");

const app=express();

connectDB();

app.use(express.json());

app.use("/api/users",require("./routes/usersRoute"));
app.use("/api/buses",require("./routes/busesRoute"));
app.use("/api/bookings",require("./routes/bookingsRoute"));

const port=process.env.port || 5000;

app.listen(port,()=>{
    console.log(`App is listening on port ${port}!`);
})
