const express = require('express');
const router = express.Router();

// @route       POST api/auth
// @desc        Get logged in
// @access      Private
// @param       NULL
router.get('/',(req, res)=>{
    // res.json({
    //     message:'Get logged in'
    // })
    res.send('Get logged in')
})

// @route       POST api/auth
// @desc        Auth user and get token
// @access      Public
// @param       NULL
router.get('/',(req, res)=>{
    // res.json({
    //     message:'Get logged in'
    // })
    res.send('Get logged in')
})
module.exports = router;