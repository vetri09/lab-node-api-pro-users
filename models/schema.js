// import mongoose
const mongoose = require('mongoose')
// get schema
const Schema = mongoose.Schema
// create new schema
const schemaData = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    age:Number,
    prograd_id:Number,
    squad:Number
},
// give the required collection
{
    collection:"details"
})
// create model using schema
const data = mongoose.model('model_one',schemaData)
// export model
module.exports=data