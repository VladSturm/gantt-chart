const express = require('express')
const OwnerRoutes = express.Router()

let OwnerModel = require('./owner.model')

OwnerRoutes.route('/addOwner').post(function (req, res) {
    let owner = new OwnerModel(req.body)
    owner.save()
    .then(owner => {
        res.json({'owner': 'owner in added successfully'})
        .catch(err => {
            res.send("unable to save to database")
        })
    })
})

OwnerRoutes.route('/').get(function(req, res) {
    OwnerModel.find(function(err, teil){
        if(err){
            console.log("err")
        }
        else {
            res.json(teil)
        }
    })
})


module.exports = OwnerRoutes