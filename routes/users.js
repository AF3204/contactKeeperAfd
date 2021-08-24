const express = require('express');
const router = express.Router();
// 20210727: Getting the User table from mongoDb
const User = require('../model/User.js')
// 20210727: ExpressJS validator
const {check,validationResult} = require('express-validator')
// 20210727: Encryption
const bcrypt = require('bcryptjs')
// 20210727: JWT
const jwt = require('jsonwebtoken')
const config = require('config')

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
    
    // res.json({
    //     message:'Register a user'
    // })
    // 20210727: Initialising the constants
    const {
        name,
        email,
        password
    } = req.body

    // 20210727: Validating the results
    const errors = validationResult(req)
    
    // 20210727: Check for errors before continuing
    if(!errors.isEmpty()){
        return res.status(400).json({
            msg:errors.array()
        })
    }

    try{
        // 20210727: Check if the user exist by unique email.
        let user = await User.findOne({email})
        
        if(user){
            return res.status(400).json({
                msg: `Email ${email} has already been used`,
                id: 1
            })
        }

        // 20210727: Initialise new users before saving
        user = new User({
            name,
            email,
            password
        })

        // 20210727: Using bcrypt to generate salt
        const salt = await bcrypt.genSalt(10);

        // 20210727: Using bcrypt to hash password
        user.password = await bcrypt.hash(password,salt)

        // 20210727: If all is ok, save
        await user.save()

        // 20210727: Creating payload
        const payload ={
            user:{
                id:user.id
            }
        }

        // 20210727: Saving into the JWT
        jwt.sign(payload,
                 config.get('jwt'),
                 {
                    expiresIn: 3600
                 },
                 (err,token)=>{
                    //  If error
                     if(err) throw err;
                    //  else
                     res.json({token})
                 });

        res.status(200).json({
            msg:`User ${name} with email->(${email}) has been CREATED`
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg:`Could not create new User ${name}`
        })
    }
})

router.get('/', async (req,res)=>{
    res.status(200).json({
        msg:'GET Request'
    })
})

module.exports = router;