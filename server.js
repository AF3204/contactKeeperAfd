/**
 * We are building from scratch
 * Using ES6 module
 */
const express = require('express')
const connectDB = require('./config/db.js')
const cors = require('cors')

// Initialising the app
const app = express()
// Initialising the PORT -> If not found: 5050
const PORT = process.env.PORT || 5050

// 20210726: Connect to DB
connectDB()

// 20210727: Init middleware
app.use(express.json({extended: false}));

// 20210824: adding in the Cors
app.use(cors())


// First GET request
app.get('/',(req, res)=>{
    res.json({
        status:'Success',
        message:'We are on track'
    })
})

// Getting the files from the route files
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))
app.use('/api/contacts', require('./routes/contacts'))

// Listening on PORT; () -> Means callback
app.listen(PORT,()=>{
    console.log(`Listening on PORT: ${PORT}`)
});

