const express = require('express')
const CategoryRoutes = express.Router()

let CategoryModel = require('./category.model')

CategoryRoutes.route('/add').post(function (req, res) {
    let category = new CategoryModel(req.body)
    category.save()
    .then(category => {
        res.json({'category': 'category in added successfully'})
        .catch(err => {
            res.send("unable to save to database")
        })
    })
})

CategoryRoutes.route('/').get(function(req, res) {
    CategoryModel.find(function(err, teil){
        if(err){
            console.log("err")
        }
        else {
            res.json(teil)
        }
    })
})

CategoryRoutes.route('/edit/:id').get(function(req, res) {
    let id = req.params.id
    CategoryModel.findById(id, function(err, result){
        res.json(result)
    })
})

CategoryRoutes.route('/update/:id').post(function(req, res) {
    let id = req.params.id
    CategoryModel.findById(id, function(err, result){
        if (!result)
        res.send('not found')
        else
        result.start = req.body.start
        result.end = req.body.end
        result.label= req.body.label

        result.save()
        .then(result => {
            res.json('Update')
        })
    })
})

CategoryRoutes.route('/delete/:id').get(function(req, res){
    
    CategoryModel.findByIdAndRemove({_id: req.params.id}, function(err, result){
        if(err) res.json(err)
        else res.json('removed')
    })
})


module.exports = CategoryRoutes