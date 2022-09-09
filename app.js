const express=require("express");
const app=express();
const main=require("./db/posts.js")
const post=require("./db/postSchema.js")
app.set("view engine","ejs");
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
main();

var _ = require('lodash');
var id="";
const myText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam dolores aspernatur aut eos perspiciatis expedita amet qui quo eveniet architecto molestias quasi recusandae sunt laborum voluptatibus distinctio facilis voluptatum, rem nisi sequi? Commodi ipsum temporibus, a accusantium laborum optio inventore distinctio est sapiente libero eius quam perferendis veritatis quibusdam placeat."
const aboutt="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut laudantium architecto dolorem rerum libero enim, natus veniam eaque voluptatem vitae quod ad laboriosam! Architecto laudantium distinctio facere odit non ipsa suscipit eveniet qui est voluptas excepturi tenetur officia corporis magnam corrupti amet soluta doloremque tempora possimus ipsum libero, ex saepe."
const contactt="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut laudantium architecto dolorem rerum libero enim, natus veniam eaque voluptatem vitae quod ad laboriosam! Architecto laudantium distinctio facere odit non ipsa suscipit eveniet qui est voluptas excepturi tenetur officia corporis magnam corrupti amet soluta doloremque tempora possimus ipsum libero, ex saepe."
app.get("/",async(req,res)=>{
    
    const posts=await post.find({});
    
   
    res.render("home",{"text":myText,"post":posts,"_":_});
})
app.get("/about",(req,res)=>{
    res.render("about",{"textt":aboutt});
})
app.get("/contact",(req,res)=>{
    res.render("contact",{"texttt":contactt});
})
app.get("/posts/:pot",async(req,res)=>{
    let myObj=await post.find({});
    myObj.forEach((poty)=>{
        if(_.lowerCase(poty.title)===_.lowerCase(req.params.pot)){
            des=poty.description
            t=poty.title;
        }
    })
    res.render("post",{"p":des,"t":t});
})
app.get("/postss/:pot",async(req,res)=>{
    id=req.params.pot
    let postt=await post.findById(id);
    
    res.render("postEdit",{"title":postt.title,"description":postt.description,"id":postt._id});
})
app.get("/compose",(req,res)=>{
    res.render("compose");
})
app.post("/",async(req,res)=>{
    await post.create({
        title:req.body.title,
        description:req.body.description
    });
    res.redirect("/");
})

app.post("/postt/:id",async(req,res)=>{

    id=req.params.id;
    let pt=await post.findByIdAndUpdate(id,{title:req.body.title,description:req.body.description})
    console.log(req.body);
    
    res.redirect("/");
})
app.get("/:pot",async(req,res)=>{
    await post.findByIdAndDelete(req.params.pot)
  
    res.redirect("/");
})
app.listen(3000,()=>{
   console.log("Server Listening at port 3000");
})