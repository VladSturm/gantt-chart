const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = 4000
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./db')
const ChartRoutes =require('./chart.routes')
const OwnerRoutes = require('./owner.routes')
const CategoryRoutes = require('./category.routes')

mongoose.Promise = global.Promise
mongoose.connect(config.DB, {useNewUrlParser: true})
.then(() =>{console.log("Database is connected")},
err => {console.log('Can not connect to the database'+ err)}
)

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.use('/chart', ChartRoutes)
app.use('/owner', OwnerRoutes)
app.use('/category', CategoryRoutes)

app.listen(PORT, () =>{
    console.log('Server is running on Port:',PORT)
})