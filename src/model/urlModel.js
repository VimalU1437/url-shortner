const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
    url:{required:true,type:String,unique:true},
    clicked:{required:true,type:Number}
})

const urlModel = mongoose.model("url",urlSchema);

module.exports = urlModel;