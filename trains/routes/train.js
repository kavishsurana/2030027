const router = require('express').Router()
const Train = require('../models/register')

router.post("/train/" , async(req,res) => {
        const {companyName , ownerName , rollno , ownerEmail ,accessCode} = req.body
    
    
    
        const newTrain = new Train({companyName , ownerName , rollno , ownerEmail ,accessCode})
    
        newTrain.save()
        .then(() => {
            console.log("Train saved sucessfully!")
            res.redirect("/")
        })
        .catch((e) => {
            console.log(e)
        })
    
})


module.export = routers;