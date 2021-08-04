import React from "react"
import Contacts from '../contacts/Contacts.js'

const Home =()=>{
    return(
        // <div className='p'>
        //     <h1>Home | Test</h1>
        // </div>
        <div className='grid-2'>
            <div>
                {/* Contact Form */}
            </div>
            <div>
                {/* Contact List */}    
                <Contacts/>
            </div>
        </div>
    )
}

export default Home