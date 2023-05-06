const mongoose = require('mongoose')
const validator = require('validator')

const bcryptjs = require('bcryptjs')

const userSchema = new mongoose.Schema({
        username : {
            type: String ,
            required: true,
            trim: true
        },
        password: {
            type: String ,
            required: true,
            trim: true,
            minlength:8,
            validate(value){
                let password = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
                if(!password.test(value)){
                    throw new Error("password must include uppercase , lowercase , number , speacial charaters")
                }
            }
        },
        email:{
            type: String ,
            required: true,
            trim: true,
            lowercase:true,
            unique:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error ('Email is invalid')
                }
            }
        },
        age:{
            type:Number,
            default:18,
            validate(value){
                if(value <= 0){
                    throw new Error ('age must be positive num')
                }
            }
        },
        city:{
            type: String 
        }
    })
    userSchema.pre("save" , async function(){
        const user = this
        console.log(user)

        if(user.isModified('password')){
        user.password = await bcryptjs.hash(user.password , 8)
        }
       
    })




    ////////////////////

    userSchema.statics.findByCredentials = async (email , password)=>{
        const user = await User.findOne({email:email})

        if(!user){
            throw new Error('unable to login')
        }
        // console.log(user)
        const isMatch = await bcryptjs.compare(password , user.password)

        if(!isMatch){
            throw new Error('unable to login')
        }
        return user
    }


    /////////////////////

const User = mongoose.model('User' , userSchema)
module.exports = User