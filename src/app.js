const express = require("express");
const urlExist = require("url-exists");
const urlModel = require("./model/urlModel");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get("/:id",async(req,res)=>{
    try{
        let id  = req.params.id;
        const data = await urlModel.findOne({_id:id})
        await urlModel.updateOne({_id:id},{$set:{clicked:data.clicked+1}});
        res.status(302).redirect(data.url);

    }
    catch(e){
        res.status(500).json({
            status:"failed",
            message:e.message,
        })
    }
})
app.post("/",async(req,res)=>{
    try{
        let url = req.body.url
        urlExist(url,async(err,exist)=>{
            try{
                if(exist){
                    let preUrl = process.env.PRE_URL;
                    const data = await urlModel.create({url:url,clicked:0});
                    res.json({
                        success:"success",
                        url:preUrl+data._id
                    });
                }else{
                   return res.status(406).json({
                        status:"failed",
                        message:"url is not valid",
                    })
                }
            }catch(e){
                res.status(500).json({
                    status:"failed",
                    message:e.message,
                })

            }
        });
    }
    catch(e){
        res.status(500).json({
            status:"failed",
            message:e.message,
        })
    }
})
app.use("*",(req,res)=>{
    res.sendStatus(404);
})

module.exports = app;