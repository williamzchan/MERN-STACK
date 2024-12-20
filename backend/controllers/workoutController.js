const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')
// get all workouts
const getWorkouts = async(req,res) =>{
    //list newest workouts at top in ana array
    const workouts = await Workout.find({}).sort({createdAt: -1})
    //send in json to the browser(clients)
    res.status(200).json(workouts)
}

//get a single workout
const getWorkout = async(req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Workout not found"})
    }
    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(404).json({error: 'Workout not found'})
    }

    res.status(200).json(workout)
}

//create new workout
//taken from workoutmode.js post function
const createWorkout = async(req,res) =>{
    const {title,load,reps} = req.body
    //add doc to db
    try{
        const workout = await Workout.create({title, load, reps})
        //to catch errors
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete a workout
const deleteWorkout = async(req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Workout not found'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})
    if(!workout){
        return res.status(404).json({error: 'Workout not found'})
    }

    res.status(200).json(workout)
}   

//update a workout
const updateWorkout = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Workout not found'})
    }
    const workout = await Workout.findOneAndUpdate({_id: id},{
        ...req.body        
    })
    if(!workout){
        return res.status(404).json({error: 'Workout not found'})
    }
    res.status(200).json(workout)
}

module.exports = {
    getWorkout,
    getWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout

}