import React, {useContext, useEffect} from "react"
import Contacts from '../contacts/Contacts.js'
import ContactForm from "../contacts/ContactForm.js"
import ContactFilter from "../contacts/ContactFilter.js"
import AuthContext from '../../context/auth/authContext'
import authContext from "../../context/auth/authContext"

const Home =()=>{
    const authContext = useContext(AuthContext)

    // Using useEffects cause you want it to run as soon as it loads
    useEffect(()=>{
        authContext.loadUser();
        // eslint-disable-next-line
    },[])

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
                {/* Adding the filtered contacts */}
                <ContactFilter/>
                {/* Contact List */}    
                <Contacts/>
            </div>
        </div>
    )
}

export default Home