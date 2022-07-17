const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username:{
  type:String,
  required:[true,'Need a username'],
  Unique:true,
  minlength:3,
  maxlength:50
  },
  user_id:{
    type:Number,
    Unique:true
  }
})

module.exports = mongoose.model('User',UserSchema)
