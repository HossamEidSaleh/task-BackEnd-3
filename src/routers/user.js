const express = require('express')
const User = require('../models/user')
const router = express.Router()

/////////////////////////
router.post('/users' ,(req , res)=>{
    console.log(req.body)

    const user = new User (req.body)
    user.save()
    .then((user)=>{res.status(200).send(user)})
    .catch((error)=>{res.status(400).send(error)})
})


/////////////////////

router.get('/users' , (req , res)=>{
    User.find({}).then((per)=>{
        res.status(200).send(per)
    }).catch((error)=>{
        res.status(500).send(error)
    })
})

////////////////////////////////


router.get('/users/:id' , (req , res)=>{
    const _id = req.params.id
    
    User.findById(_id).then((per)=>{
        if(!per){
          return   res.status(404).send('unable to find person')
        }
        res.status(200).send(per)
    }).catch((error)=>{
        res.status(500).send(error)
    })
})



///////////////////////////////////////////////



router.patch('/users/:id' , async (req , res)=>{
    try{
        const _id = req.params.id
        const updates = Object.keys(req.body)
      

        // const user = await User.findByIdAndUpdate(_id , req.body , {
        //     new: true,
        //     runValidators: true
        // })

        const user = await User.findById(_id)

        
              

        if(!user){
            return res.status(404).send('no user founded')
        }

   
        updates.forEach((ele)=>(user[ele] = req.body[ele]))
        await user.save()

        res.status(200).send(user)
    }
    catch(error){
        res.status(400).send(error)
    }
})



/////////////////////////////////////////////   


router.delete('/users/:id' , async (req , res)=>{
    try{
        const _id = req.params.id
        const user = await User.findByIdAndDelete(_id)
        if(!user){
            return res.status(404).send('unable to find user')
        }
        res.status(200).send(user)
    }
    catch(error){
        res.status(500).send(error)
    }
})



//////////////////////////////////////


////////.......login .......

router.post("/login" , async(req ,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email , req.body.password)
        res.status(200).send(user)
    }catch(e){
        res.status(400).send(e.message)
    }
})






module.exports= router