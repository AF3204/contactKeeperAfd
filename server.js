/**
 * We are building from scratch
 * Using ES6 module
 */
const express = require('express')

// Initialising the app
const app = express()
// Initialising the PORT -> If not found: 5050
const PORT = process.env.PORT || 5050

// First GET request
app.get('/',(req, res)=>{
    res.json({
        status:'Success',
        message:'We are on track'
    })
})

// Listening on PORT; () -> Means callback
app.listen(PORT,()=>{
    console.log(`Listening on PORT: ${PORT}`)
});

