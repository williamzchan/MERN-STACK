const express = require('express')
//create a new documents and is more organized
const{
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout

} = require('../controllers/workoutController')

//const Workout = require'../models/workoutModel'
const router = express.Router()

//GET all workouts
router.get('/', getWorkouts)


//GET a single workout
router.get('/:id', getWorkout)

//POST a new workout
router.post('/', createWorkout)

//Delete a workout
router.delete('/:id',deleteWorkout)

//Update a workout
router.patch('/:id', updateWorkout)


module.exports= router