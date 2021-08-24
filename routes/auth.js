const express = require('express');
const router = express.Router();
// 20210727: Getting the User table from mongoDb
const User = require('../model/User.js')
// 20210727: Encryption
const bcrypt = require('bcryptjs')
// 20210727: JWT
const jwt = require('jsonwebtoken')
const config = require('config')
const {check,validationResult} = require('express-validator')

// 20210729: Getting the auth
const auth = require('../middleware/auth.js')

// @route       GET api/auth
// @desc        Get logged in
// @access      Private
// @param       NULL

router.get('/',auth, async(req, res)=>{
    // res.json({
    //     message:'Get logged in'
    // })
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json({
            msg:user
        })
    }catch(err){
        console.log(err)
        res.status(404).json({
            msg: 'Unable to verify user -> server error'
        })
    }
    
})

// @route       POST api/auth
// @desc        Auth user and get token
// @access      Public
// @param       NULL
router.post('/',
    [
        check('email','Please include email').isEmail(),
        check('email','Please include email').exists()
    ],
    async (req, res)=>{
    
    // 20210727: Check for errors before continuing
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            msg:errors.array()
        })
    }

    const{
        email,
        password
    } = req.body

    try{
        // 20210727: User exist or nay
        let user = await User.findOne({email})
        
        if(!user){
            return res.status(400).json({
                msg: `Invalid Email`
            })
        }

        // 20210727: Password matched?
        let isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({
                msg: `Invalid Password`
            })
        }

        const payload ={
            user:{
                id:user.id
            }
        }

        // 20210727: Saving into the JWT
        jwt.sign(
            payload,
            config.get('jwt'),
            {
            expiresIn: 360000
            },
            (err,token)=>{
            //  If error
                if(err) throw err;
            //  else
                res.json({token})
            });


    }catch(err){
        console.log(err.message);
        res.status(500).json({
            msg:'Server Error'
        })
    }
})

module.exports = router;