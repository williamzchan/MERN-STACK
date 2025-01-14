const mongoose = require('mongoose')
//hashes passwords so it is not directly viewed in case of hacking
const bcrpyt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})

//static signup  method, will be part of our password hashing
userSchema.statics.signup = async function(email, password) {
    //validation
    if (!email || !password){
        throw Error("All fields must be filled")
    }
    if (!validator.isEmail(email)){
        throw Error("Email is not valid")

    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password not strong enough")

    }

    //arrow function doesn't work on this. keyword
    const exists = await this.findOne({ email })

    if(exists){
        throw Error("Email already in use") 
    }

    //bcrypt uses salt while hashing which creates a random string of 
    // character to password before hashing and prevents password matching

    const salt = await bcrpyt.genSalt(10)
    const hash = await bcrpyt.hash(password, salt)  
    //store/document this along side user email

    const user = await this.create({email, password: hash})

    return user

}

module.exports = mongoose.model('User', userSchema)
