const express = require('express');
const router = express.Router();

// @route       POST api/contact
// @desc        Get user contacts
// @access      Private
// @param       user
router.get('/',(req, res)=>{
    res.send('Get all contacts')
})

// @route       POST api/auth
// @desc        Add new contact
// @access      Private
// @param       NULL
router.post('/',(req, res)=>{
    res.send('Add new user')
})

// @route       PUT api/auth
// @desc        Update contact
// @access      Private
// @param       NULL
router.put('/:id',(req, res)=>{
    res.send('Update contact')
})

// @route       DELETE api/auth
// @desc        Add new contact
// @access      Private
// @param       NULL
router.delete('/:id',(req, res)=>{
    res.send('Delete contact')
})

module.exports = router;