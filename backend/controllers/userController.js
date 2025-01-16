const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

//will generate our jsonwebtokens
const createToken = (_id) => {
    //can add token as second parameter to sign function 
    // can be any string but this is unsafe so put it into .env
    return jwt.sign({_id}, process.env.PASSWORD, {expiresIn: '3d'})
}

//controller for users login
const loginUser = async (req, res) =>{

    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        // create a user token
        const token = createToken(user._id)

        //replace user param with token, qucker authentication
        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
    
    res.json({mssg: 'login user'})

}

//controller for users signup
const signupUser = async(req, res) =>{

    const {email, password} = req.body 

  

    try {
        const user = await User.signup(email, password)

        // create a user token
        const token = createToken(user._id)

        //replace user param with token, qucker authentication
        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }

    res.json({mssg: 'signup user'})

}

module.exports =  {signupUser, loginUser}