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
// // import shortid
// let shortid = require('shortid')
// // idk man - shortid

// get - done
app.get('/users', async (req,res)=>{
    const list = await data.find({},{name:1,email:1,age:1,prograd_id:1,squad:1,_id:1})
    .then(result=>{
        res.send({
            result,
            message:"found them"
        })
    }).catch(err=>{
        res.status(500).send({
            error: err,
            errorMessage: "The users information could not be retrieved."
        })
    })
})
// get using id - done
app.get('/users/:_id', async (req,res)=>{
    // res.send(req.params)
    const list = await data.find(req.params)
    .then(result=>{
        res.send({
            result,
            message:"found it"
        })
    }).catch(err=>{
        res.status(404).send({
            error:err,
            message: "The user with the specified ID does not exist." 
        })
    })
})
// post - done
app.post('/users', async (req,res)=>{
    const list = await new data({
        // _id:shortid.generate(),
        name:req.body.name,
        email:req.body.email,
        age:req.body.age,
        prograd_id:req.body.prograd_id,
        squad:req.body.squad
    }).save().then(result=>{
        res.status(201).send({
            message:"added them",
            created:result
        })
    }).catch(err=>{
        res.status(400).send({
            errorMessage: "Please provide name and bio for the user.",
            error: err
        })
    })
})
// delete with id - done
app.delete('/users/:_id', async (req,res)=>{
    const list = await data.deleteOne(req.params)
    .then(result=>{
        res.status(200).send({
            result,
            message:"user deleted"
        })
    }).catch(err=>{
        res.status(404).send({
            error: err,
            message: "The user with the specified ID does not exist."
        })
    })
})


// put
app.put('/users',async (req,res)=>{
    const list = await data.updateOne({name:"vetrivelan2"},req.body)
    res.send({
        list,
        message:"user updated"
    })
})
// delete
app.delete('/users', async (req,res)=>{
    const list = await data.deleteOne(req.body)
    res.status(200).send({
        list,
        message:"user deleted"
    })
})
// put using id
app.put('/users/:_id',async (req,res)=>{
    const list = await data.updateOne(req.params,req.body)
    .then(result=>{
        res.status(200).send({
            result,
            message:"user updated"
        })
    }).catch(err=>{
        res.status(404).send({
            error:err,
            message: "The user with the specified ID does not exist."
        }) 
    })
})

.listen(3000,()=>console.log('server at 3000'))