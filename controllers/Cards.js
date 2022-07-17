const Card = require('../models/Card')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError} = require('../errors')
var ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { uniqueNamesGenerator }  = require('unique-names-generator')

const philosophers = [
  'Plato',
  'Aristotle',
  'Socrates',
  'Immanuel Kant',
  'René Descartes',
  'Friedrich Nietzsche',
  'Ludwig Wittgenstein',
  'John Locke',
  'David Hume',
  'Georg Wilhelm Friedrich Hegel',
  'Jean-Jacques Rousseau',
  'Baruch Spinoza',
  'Bertrand Russell',
  'Diogenes',
  'Thomas Aquinas',
  'Karl Marx',
  'Martin Heidegger',
  'Thales of Miletus',
  'John Stuart Mill',
  'Saul Kripke',
  'Hilary Putnam',
  'Noam Chomsky',
  'Thomas Hobbes',
  'Jean-Paul Sartre',
  'Niccolò Machiavelli',
  'Augustine of Hippo',
  'Epicurus',
  'Charles Sanders Peirce',
  'Donald Davidson',
  'Democritus',
  'Richard Rorty',
  'Søren Kierkegaard',
  'Michel Foucault',
  'Hannah Arendt',
  'Slavoj Žižek',
  'Diogenes Laërtius',
  'G. E. M. Anscombe',
  'Pythagoras',
  'Heraclitus',
  'Rudolf Carnap',
  'Henri Bergson',
  'Ralph Waldo Emerson',
  'Confucius',
  'Cornel West',
  'Albert Camus',
  'Simone de Beauvoir',
  'Arthur Schopenhauer',
  'Voltaire'
];
const Config = {
  dictionaries: [philosophers]
}

const create = async (req,res,next) => {
  const {name,
  budget_name,
  owner_id,
  spent,
  available_to_spend,
  card_type,
  expiry,
  limit,
  status} = req.body

  try {
  const card = await Card.create({name,
    budget_name,
    owner_id,
    spent,
    available_to_spend,
    card_type,
    expiry,
    limit,
    status})
  const userfound = await User.findOne({user_id:owner_id})
  console.log(userfound)
  if(!userfound)
{
   const user = await User.create({username:uniqueNamesGenerator(Config),user_id:owner_id})
   console.log(user)
}
 return res.status(StatusCodes.ACCEPTED).json(card)

}
  catch(err)
  {
    console.log(err)
    res.status(StatusCodes.BAD_REQUEST).json(err)
  }
}


const getBlockedCards = async(req,res) => {
  const {params:{query:query,skip:skip}} = req
  const {filter} = req.body
  let reg = /(.*?)/
  if(query !== "askdhasdkjashd")
  reg = new RegExp(query, 'i') 
  var matchObj = {
    status:'Blocked',
    name:reg,    
  }
  console.log(filter)
  if(filter.userid!='')
  matchObj.owner_id=  parseInt(filter.userid, 10)
  if(filter.subscription ^ filter.burner)
  matchObj.card_type = filter.subscription ? 'subscription' : 'Burner'

  if(query !== "askdhasdkjashd")
  reg = new RegExp(query, 'i') 
  const cards = await Card.aggregate([
    { $match : matchObj } ,
    { $sort : { createdAt : -1 } },
  { $skip: skip*10 },
   { $limit:10 },
     { $lookup:
  {
    from: "users",
    localField: "owner_id",
    foreignField: "user_id",
    as:"user",
  }
  },
])
return  res.status(StatusCodes.OK).json(cards)
}

const getCards = async(req,res) => {
  const {params:{query:query,skip:skip}} = req
  const {filter} = req.body
  let reg = /(.*?)/
  if(query !== "askdhasdkjashd")
  reg = new RegExp(query, 'i') 
  var matchObj = {
    status:'active',
    name:reg,    
  }
  console.log(filter)
  if(filter.userid!='')
  matchObj.owner_id=  parseInt(filter.userid, 10)
  if(filter.subscription ^ filter.burner)
  matchObj.card_type = filter.subscription ? 'subscription' : 'Burner'

  console.log(matchObj)
  const cards = await Card.aggregate([
    { $match : matchObj} ,
    { $sort : { createdAt : -1 } },
    { $skip: skip*10 },
   { $limit:10 },
     { $lookup:
  {
    from: "users",
    localField: "owner_id",
    foreignField: "user_id",
    as:"user",
  }
  },
])

 return  res.status(StatusCodes.OK).json(cards)
}


const getCardsforId = async(req,res) => {
  const {params:{query:query,userid:userid,skip:skip}} = req
  const {filter} = req.body
  let reg = /(.*?)/
  if(query !== "askdhasdkjashd")
  reg = new RegExp(query, 'i') 
  var matchObj = {
    status:'active',
    name:reg,    
  }
  matchObj.owner_id= parseInt(userid,10)
  if(filter.subscription ^ filter.burner)
  matchObj.card_type = filter.subscription ? 'subscription' : 'Burner'
  console.log(matchObj,skip)
  const cards = await Card.aggregate([
     { $match : matchObj} ,
    { $sort : { createdAt : -1 } },
    { $skip: skip*10 },
   { $limit:10 }])
  return  res.status(StatusCodes.OK).json(cards)
}

module.exports  = {
  create,getCards,getCardsforId,getBlockedCards
}
