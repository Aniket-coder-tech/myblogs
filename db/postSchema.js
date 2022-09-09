const { model } = require("mongoose");
const mongoose=require("mongoose");
const GrocerySchema=new mongoose.Schema({
    title:String,
    description:String
});
module.exports=mongoose.model("Post",GrocerySchema);
