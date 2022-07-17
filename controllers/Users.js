const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')
const createUser = async (req,res) => {
  try{
    const {username,user_id} = req.body
    const userfind = await User.findOne({username,user_id})
    if(userfind)
    throw new BadRequestError('User already exists')
    const user = await User.create({...req.body})
    res.status(StatusCodes.CREATED).json(user)
  }
  catch(error)
  {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)

  }
}

const getAllCards = async (req,res) => {
  try{
    const users = await User.find({})
    res.status(StatusCodes.CREATED).json(users)
  }
  catch(error)
  {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)

  }
}

module.exports = {
  createUser,getAllCards
}
