const express = require ('express')
const mongoose = require ('mongoose')
const morgan = require ('morgan')
const bodyParser = require ('body-parser')
const cookieParser = require ('cookie-parser')
const expressValidator = require('express-validator');


// load env variables
require ('dotenv').config()
// import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')



// app
const app = express ()

// db connections
mongoose.connect(
    process.env.DATABASE, {
        
        userNewUrlParser: true, 
        useCreateIndex: true
    
    }).then (() => console.log('DB Connected')) 

mongoose.connection.on('error', err => {
    console.log('DB connection error: ${err.message}')

});
// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
// routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);



const port = process.env.PORT || 8000

app.listen(port, () =>   {

    console.log(`Server is Running on ${port}`);


});