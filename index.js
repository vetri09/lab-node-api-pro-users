// require express
const express = require('express')
// get as function  
const app = express()
// make it use express
app.use(express.json())
// get the atlas url
const url = 'mongodb+srv://vetrivelan:vetrivelan@cluster0.iczh2.mongodb.net/users?retryWrites=true&w=majority';
// reuire mongoose
const mongoose = require('mongoose')
// connect mongoose to atlas
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true})
// get schema
const data = require('./models/schema.js')
// import shortid
let shortid = require('shortid')

// get
app.get('/', async (req,res)=>{
    const list = await data.find()
    res.send({
        list,
        message:"found them"
    })
})
// post
app.post('/', async (req,res)=>{
    const list = await new data(req.body, {_id:shortid.generate()})
    await list.save()
    res.status(201).send({
        list,
        message:"added them"
    })
})
// put
app.put('/',async (req,res)=>{
    const list = await data.updateOne({name:"vetrivelan2"},req.body)
    res.send({
        list,
        message:"user updated"
    })
})
// delete
app.delete('/', async (req,res)=>{
    const list = await data.deleteOne(req.body)
    res.status(200).send({
        list,
        message:"user deleted"
    })
})

// using id's
// fucntion get using id
app.get('/:_id', async (req,res)=>{
    // res.send(req.params)
    const list = await data.find(req.params)
    res.send({
        list,
        message:"found it"
    })
})
// put using id
app.put('/:_id',async (req,res)=>{
    const list = await data.updateOne(req.params,req.body)
    res.send({
        list,
        message:"user updated"
    })
})
// delete with id
app.delete('/:_id', async (req,res)=>{
    const list = await data.deleteOne(req.params)
    res.status(200).send({
        list,
        message:"user deleted"
    })
})
.listen(3000,()=>console.log('server at 3000'))