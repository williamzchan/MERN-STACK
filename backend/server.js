require('dotenv').config()
//express app
const express = require ('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
//express app
const app = express()

//middleware that fires for each request, which takes 3 arguments, next allows for 
//next piece of middleware, which is the app.get function right below
app.use(express.json())
app.use((req, res, next)=> {
    console.log(req.path, req.method)
    next()
})

//listen for a requests port number
//is middle ware which is between sent and get

/*
app.get('/',(req, res)=>{
    res.json({mssg:'welcome to the app'})
})
*/

//routes
app.use('/api/workouts',workoutRoutes)

//connect to 
//password is Adminkey
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, ()=>{
            console.log('connected to db & listening on port', process.env.PORT)
        })        
    } )
    .catch((error) =>{
        console.log(error)
    })


//process.env this is replaced by the first line code which we can use in line 14