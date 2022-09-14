const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here

app.get("/mario", async (req, res) => {
    const data = await marioModel.find();
    res.json({
        data
    })
})

app.get("/mario/:id", async (req, res) => {
    try {
        const data = await marioModel.findOne({ _id: req.params.id })
        res.json({
            data
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

app.post("/mario", async (req, res) => {
    try {
        const data = await marioModel.create({
            name: req.body.name,
            weight: req.body.weight
        })
        res.status(201).json({
            data
        })

    } catch (error) {
        res.status(400).json({
            message:'either name or weight is missing'
        })
    }
})

app.patch("/mario/:id", async(req,res)=>{
    try{
        const data = await marioModel.updateOne({_id:req.params.id}, {characterDied:req.body.characterDied});
        res.json({
            data
        })
        
    }
    catch(error){
        res.status(400).json({
            message:error.message
        })
    }
})

app.delete("/mario/:id", async(req,res)=>{
    try{
        const data = await marioModel.deleteOne({_id:req.params.id});
        res.status(200).json({
            message:"Character Deleted"
        })
    }
    catch(error){
        res.status(400).json({
            message:error.message
        })
    }
})

module.exports = app;