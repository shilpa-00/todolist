const express=require('express')
//const mongoose=require('mongoose')

var app=express()
app.use(express.json())

/* mongoose.connect('mongodb+srv://shilpa2468:shilpa2468@cluster0.unwlntb.mongodb.net/?retryWrites=true&w=majority',(err)=>{
    if(!err)
        console.log("Database connected");
    else
        console.log("Database error");
})

const TaskSchema= new mongoose.Schema({
    task:{
        type:String
    }
})
const Task=mongoose.model("Task",TaskSchema);

app.get('/gettasks',(req,res)=>{
    const usertasks=Task.find({});
    res.send(usertasks);
})
 */
app.get('/',(req,res)=>{
    res.send("hello");
    res.status(200).json({
        message:"hello"
    })
})

app.listen(5000,(error)=>{
    if(!error)
        console.log("Sucess");
    else
        console.log("Failure");
});