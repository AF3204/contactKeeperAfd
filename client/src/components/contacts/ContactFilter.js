import React, {useContext,useRef, useEffect} from 'react'
import ContactContext from '../../context/contact/contactContext'
import { CLEAR_FILTER } from '../../context/types'

const ContactFilter = () => {
    // Initialising
    const contactContext = useContext(ContactContext)
    // Deconstructuring
    const {filterContacts, clearFilter, filtered} = contactContext
    // Instead of useState, we will be using useRef to detect changes
    const text = useRef('')

    // UseEffect is used to reset the state
    useEffect(()=>{
        if(filtered === null){
            text.current.value = '';
        }})

    const onChange = e =>{
        if(text.current.value !== ''){
            filterContacts(e.target.value)
        }else{
            clearFilter()
        }
    }

    return (
        // 
        <div>
            <form>
                {/* ref will be used in the useRef */}
            <input
                ref={text}
                type='text'
                placeholder='Filter Contacts...'
                onChange={onChange}
            />
            </form>
        </div>
    )
}

export default ContactFilter