const express = require('express');
const router = express.Router();
// 20210727: Getting the User table from mongoDb
const User = require('../model/User.js')
// 20210727: ExpressJS validator
const {check,validationResult} = require('express-validator')
// 20210727: Encryption
const bcrypt = require('bcryptjs')

// @route       POST api/users
// @desc        Register a user
// @access      Public
// @param       NULL
/** 20210727: 
 * format for validate: check('Thing you want to check','error message')
 *                          .whatever_is_the_validation
 *                          .isEmpty() <- Not empty 
 *                          .isEmail() <- Make sure it is email                    
 * */ 
router.post('/',
[
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password length with 6 char or more')
        .isLength({
            min:6
        }),
],
async(req, res)=>{
    try{
        // res.json({
        //     message:'Register a user'
        // })
        // 20210727: Validating the results
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                msg:errors.array()
            })
        }

        const {
            name,
            email,
            password
        } = req.body

        res.status(200).json({
            msg:req.body
        })
    }catch(err){
        console.log(err);
    }
})

router.get('/', async (req,res)=>{
    res.status(200).json({
        msg:'GET Request'
    })
})

module.exports = router;