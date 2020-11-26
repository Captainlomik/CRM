const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport=require('passport')

const authRoutes = require('./routes/auth')
const analiticsRoutes = require('./routes/analitics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const keys = require('./config/keys')

const app = express()

mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
    useNewUrlParser: true})
    .then(() => console.log('MongoBD connected'))
        .catch(err => console.log(err))

app.use(passport.initialize())
require('./middleweare/passport')(passport)        
        
app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth',  authRoutes)
app.use('/api/analitics', analiticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

module.exports = app;