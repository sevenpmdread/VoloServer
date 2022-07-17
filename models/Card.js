const mongoose  = require('mongoose')
const CardSchema = new mongoose.Schema({
name:{
  type:String,
  required:[true,"Please provide a  name"],
},
budget_name:{
  type:String
},
owner_id:{
  type:Number,
},
spent:Object,
available_to_spend:Object,
card_type:String,
expiry:Date,
limit:Number,
status:String
},{ timestamps: true })

module.exports = mongoose.model('Card',CardSchema)

