const express = require('express');
const router = express.Router();

// @route       POST api/users
// @desc        Register a user
// @access      Public
// @param       NULL
router.post('/',(req, res)=>{
    // res.json({
    //     message:'Register a user'
    // })
    res.send('Register a user')
})

// router.get('/',(req,res)=>{

// })

module.exports = router;