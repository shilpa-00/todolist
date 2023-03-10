const express = require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const todoRouter=require('./routes/todo')
require('dotenv').config()


const app = express()
app.use(cors());

const uri=process.env.ATLAS_URI

mongoose.connect(uri)
const con=mongoose.connection

con.on('open',()=>{
    console.log('Database connected')
})

app.use(express.json())
app.use('/task',todoRouter)
  
  
app.listen(5000, () => {
    console.log('Running')
})