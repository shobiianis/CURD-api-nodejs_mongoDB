const { response } = require("express");
const express=require("express");
const dbConnect=require("./mongodb.js");
const app=express();
const mongodb=require("mongodb")

//nodejs get method for Api 
app.get("/",async (req,res)=>{
    let database=await dbConnect();
    
    let data=await database.find().toArray();
    
     res.send(data);

})



//Node.js post api

/*
app.post("/",(req,res)=>{
    
    res.send({"name":"shobii"})
    
})
*/

app.use(express.json()); 

/* 
app.post("/",(req,res)=>{
    
    console.log(req.body)
    res.send(req.body)
})

*/

//now sending to mongodb

app.post("/",async (req,res)=>{
    
    let database= await dbConnect();
    let result= await database.insertOne(req.body)
    res.send(result)//this will simulatanously sends response which Api give
})


//node.js put api 

// app.use(express.json()); commented because already wrote on above but this line of code is necessary 
// when postman se data ayega or use hoga Node.js me
app.put( "/" ,  async (req,res)=>{

    let database= await dbConnect();
    let result= await database.updateOne({

        "name":"somsong" // this will update for where name is samsong
    },{$set : req.body }) // updated data will be from postman as object 
    res.send(result)//this will simulatanously sends response which Api give

})

// Node.js delete Api 
app.delete("/:id",async(req,res)=>{

let database= await dbConnect();
let result= await database.deleteOne({_id: new mongodb.ObjectId(req.params.id)}) // is extra code k lye humne mongodb=require("mongodb") kia hai 

res.send(result)  


})

app.listen(8001);