const express = require('express');
const app =express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoute');
const path = require('path');
const cookieParser = require('cookie-parser');
const validation = require('./validation/userValidation')
const joi = require('joi');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcryptjs = require('bcryptjs')
const port = process.env.PORT||3600;



mongoose.connect(process.env.MONGODB_CONNECTION).then(()=>{console.log("Database Connected")}).catch((err)=>{console.log(err)});


// route middleware
app.use(bodyParser.json());//parses data  to json
app.use(express.urlencoded({extended: true}));//or app.use(express.json());
app.use(cookieParser()); 
app.set('view engine', 'ejs');
app.use(cors());
app.use('/api/authRoute', authRoutes);
// app.use('/api/userRoute', userRoute)
app.use (express.static(path.join(__dirname, "assets")));//host  express static files
app.use(cors({origin: 'http://localhost:3600'}));//allows cross origin resources sharing



app.get('/', (req, res)=>{
  res.render( 'index')
});

app.get('/register', (req, res)=>{
  res.render( 'register')
});

app.get('/dashboard', (req,res)=>{
  res.render('dashboard')
})


app.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}/`)
})