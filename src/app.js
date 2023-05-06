
// const mongoose = require('mongoose')

// mongoose.connect('mongodb://127.0.0.1:27017/lec-10')

// const Car = mongoose.model('Car' , {type : String})

// const car1  = new Car ({type : 'audi'})

// car1.save()
// .then(()=>console.log('car added'))
// .catch(()=>console.log('error 404'))

//////////////////////////////////////////////

// const bcrypt = require("bcryptjs")

// const passwordFun = async ()=>{
//     const password = "123456789"

//     const hashedPass = await bcrypt.hash(password , 8)
//     console.log(password)

//     console.log(hashedPass)
//     const compare = await bcrypt.compare("123456789" , hashedPass)
//     console.log(compare)
// }
// passwordFun()






////////////////////////////////////////////////

const express = require('express')
const app = express()
const port  = process.env.PORT || 3000

require('./db/mongoose')
app.use(express.json())
const useRouter= require("./routers/user")
app.use(useRouter)

app.listen(port , ()=>{ console.log("all done successfully")})

// app.get('/' , (req , res)=>{
//     res.send("hossam")
// })