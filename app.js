
// import express
const express = require ('express')

// import mongoose
const mongoose = require ('mongoose')

const app = express ()

// load env variables
require ('dotenv').config()

// import routes
const userRoutes = require('./routes/user')

// db connections
mongoose.connect(
    process.env.DATABASE, {
        
        userNewUrlParser: true, 
        useCreateIndex: true
    
    }).then (() => console.log('DB Connected')) 

mongoose.connection.on('error', err => {
    console.log('DB connection error: ${err.message}')

});


// routes middleware
app.use("/api", userRoutes);

const port = process.env.PORT || 8000

app.listen(port, () =>   {

    console.log(`Server is Running on ${port}`);


});