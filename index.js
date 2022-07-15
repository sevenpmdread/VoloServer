require('dotenv').config();
require('express-async-errors');
const express = require('express');
var bodyParser = require('body-parser')
const app = express();
var cors = require('cors');
app.use(cors());
const connectDB = require('./db/connect')
const cardRouter = require('./routes/Cards')
const userRouter = require('./routes/Users')
var jsonParser = bodyParser.json({ limit: "50mb" })


app.use(bodyParser.urlencoded({ limit: "50mb", extended: false, parameterLimit: 50000 }))
app.use(express.json());
app.get('/', (req, res) => {
  res.send('volopay api');
});
app.use('/api/v1/cards',cardRouter)
app.use('/api/v1/users',userRouter)


const port = process.env.PORT || 5000;


const start = async () => {
  try {
    await connectDB('mongodb+srv://aditya:incorrect12345@cluster0.bd38w.mongodb.net/?retryWrites=true&w=majority')
    app.listen(process.env.PORT || 5000, () =>
    console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
