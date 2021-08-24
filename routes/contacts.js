const express = require('express');
const router = express.Router();
// 20210802: Getting the User table from mongoDb
const User = require('../model/User.js')
const Contact = require('../model/Contact.js')
// 20210802: ExpressJS validator
const {check,validationResult} = require('express-validator')
// 20210802: Auth
const auth = require('../middleware/auth.js')

// @route       GET api/contact
// @desc        Get user contacts
// @access      Private
// @param       user
router.get('/',auth,async (req, res)=>{
    try{
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1})
        res.json(contacts)
    }catch(err){
        console.log(err.message)
        res.status(500).json({
            msg: ' Server Error - Unable to find contacts'
        })
    }
})

// @route       POST api/auth
// @desc        Add new contact
// @access      Private
// @param       NULL
router.post('/',
    auth,
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
    ],
    async (req, res)=>{
        console.log('Hit in the server')
        // 20210802: Validating the results
        const errors = validationResult(req)
        
        // 20210802: Check for errors before continuing
        if(!errors.isEmpty()){
            return res.status(400).json({
                msg:errors.array()
            })
        }

        // 20210802: Initialising the constants
        const {
            name,
            email,
            phone,
            type
        } = req.body

        try{
            // 20210802 - user:req.user.id -> save a new contact with reference to this ID
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user:req.user.id
            })

            // 20210802 - If not needed to send the saved contacts, just await is enough
            const contact = await newContact.save();

            res.json(contact)
        }catch(err){
            console.log(err.message);
            res.status(500).json({
                msg:'Unable to insert new contacts - Server Error'
            })
        }

})

// @route       PUT api/auth
// @desc        Update contact
// @access      Private
// @param       NULL
router.put('/:id',auth, async(req, res)=>{
    // res.send('Update contact')
    const {
        name,
        email,
        phone,
        type
    } = req.body

    const contactFields = {};

    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try{
        //  20210802 - We get the param from the link
        let contact = await Contact.findById(req.params.id)

        if(!contact) return res.status(404).json({ msg:'Contact not found!'})

        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'Not authorized to change the details'})
        }

        contact = await Contact.findByIdAndUpdate(req.params.id,
                                                    {$set: contactFields},
                                                    {new: true, useFindAndModify: false});
        res.status(200).json({
            status:'Success',
            msg:contact
        })

    }catch(err){
        console.log(err.object);
        res.status(500).json({
            msg:'Unable to insert new contacts - Server Error'
        })
    }
})

// @route       DELETE api/auth
// @desc        Add new contact
// @access      Private
// @param       NULL
router.delete('/:id',auth,async (req, res)=>{
    try{
        //  20210802 - We get the param from the link
        let contact = await Contact.findById(req.params.id)

        if(!contact) return res.status(404).json({ msg:'Contact not found!'})

        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'Not authorized to change the details'})
        }

        await Contact.findByIdAndRemove(req.params.id,{useFindAndModify:false});
        
        res.status(200).json({
            status:'Success',
            msg:`ID ${contact.name} has been removed`
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            msg:'Unable to remove contacts - Server Error'
        })
    }
})

module.exports = router;