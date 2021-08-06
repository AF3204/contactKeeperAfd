import React from "react"
import Contacts from '../contacts/Contacts.js'
import ContactForm from "../contacts/ContactForm.js"

const Home =()=>{
    return(
        // <div className='p'>
        //     <h1>Home | Test</h1>
        // </div>
        <div className='grid-2'>
            <div className='p-1'>
                {/* Contact Form */}
                <ContactForm/>
            </div>
            <div className='p-1'>
                {/* Contact List */}    
                <Contacts/>
            </div>
        </div>
    )
}

export default Home