const express = require('express')
const ChartRoutes = express.Router()

let ChartModel = require('./chart.model')

ChartRoutes.route('/add').post(function (req, res) {
    let chart = new ChartModel(req.body)
    chart.save()
    .then(chart => {
        res.json({'chart': 'chart in added successfully'})
        .catch(err => {
            res.send("unable to save to database")
        })
    })
})

ChartRoutes.route('/').get(function(req, res) {
    ChartModel.find(function(err, teil){
        if(err){
            console.log("err")
        }
        else {
            res.json(teil)
        }
    })
})

ChartRoutes.route('/edit/:id').get(function(req, res) {
    let id = req.params.id
    ChartModel.findById(id, function(err, result){
        res.json(result)
    })
})

ChartRoutes.route('/update/:id').post(function(req, res) {
    let id = req.params.id
    ChartModel.findById(id, function(err, result){
        if (!result)
        res.send('not found')
        else
        result.TaskName = req.body.TaskName
        result.OwnerName = req.body.OwnerName
        result.StartDate = req.body.StartDate
        result.EndDate = req.body.EndDate

        result.save()
        .then(result => {
            res.json('Update')
        })
    })
})

ChartRoutes.route('/delete/:id').get(function(req, res){
    
    ChartModel.findByIdAndRemove({_id: req.params.id}, function(err, result){
        if(err) res.json(err)
        else res.json('removed')
    })
})


module.exports = ChartRoutes