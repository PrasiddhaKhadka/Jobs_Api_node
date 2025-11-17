const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        minlength: 3,
        maxlength: 50 
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minlength: 6,
    }
}, 
{timestamps: true}, 
{versionKey: false},
)


UserSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  
})
module.exports = mongoose.model("User", UserSchema)