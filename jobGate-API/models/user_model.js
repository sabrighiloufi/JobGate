const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const options = {
    discriminatorKey:"itemtype",
    collection:"users",
    timestamps:true
}

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    image:{
        type: String,
       
    },
    verified:{
        type: Boolean,
        default: false
    },
    verificationCode:{
        type: String,
    },
    resetPasswordToken:{
        type: String
    },
    confirmed:{
        type:Boolean,
        default: false
    }
}, options)

/*userSchema.pre("save", function(next){
    if(this.password){
        var salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
})*/

module.exports = mongoose.model("users", userSchema)