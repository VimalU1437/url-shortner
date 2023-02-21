const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./src/app");
const port = process.env.PORT;

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL,(err)=>{
    if(err){
        console.log(err.message);
    }else{
        console.log("connected to database");
    }
})



app.listen(port,()=>{
    console.log("connected to " + port);
})