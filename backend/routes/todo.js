const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')

router.get('/read', async (req, res) => {
    try {
        const result = await Todo.find()
        res.status(200).json(result)
    } catch (error) {
        res.json(error)
    }
})

router.post('/create', async (req, res) => {
    const todo = new Todo({
        task: req.body.task
    })
    try {
        const result = await todo.save()
        res.status(200).json(result)
    } catch (error) {
        res.json(error)
    }
})

router.put('/update',async(req,res)=>{
    try{
        const result=await Todo.findByIdAndUpdate(req.body._id,req.body)
        res.status(200).json(result)
    }catch(error){
        res.json(error)
    }
})

router.delete('/delete/:id',async(req,res)=>{
    try{
        // console.log(req.params.id)
        const result=await Todo.findByIdAndDelete(req.params.id)
        res.status(200).json(result)
    }catch(error){
        res.json(error)
    }
})

module.exports = router