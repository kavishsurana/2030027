const express = require('express')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const train = require('./models/register')

dotenv.config();

const app = express();


app.use(express.json())

app.use(require("./routers/train"))





mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
})
.then(()=> app.listen(5000))
.then(()=>console.log("connected to database and listening to LocalHost 5000"))
.catch((err)=>{
    console.log(err)
})


