const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb+srv://anie-coder:Test123@cluster0.dsei2jd.mongodb.net/MyPosts',(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("connected to the db")
    }
   
  });
}


module.exports=main;

