import React, {Fragment, useContext} from 'react'
import ContactContext from '../../context/contact/contactContext';

import ContactItem from "../contacts/ContactItem.js"


const Contacts = () => {
    // 20210804 - Using the values from the Context
    /**
     * 20210808 - Getting the values from Filtered and change the content
     */
    const contactContext = useContext(ContactContext)

    // 20210804 - Destructuring
    // 20210808 - Added filtered
    const { contacts, filtered } = contactContext
    
    if(contacts.length === 0){
        return <h4>Please add contact</h4>
    }
    // contact=>(
    //     <ContactItem key={contact.id} contact={contact}/>
    return (
        <Fragment>
            <div>
                {filtered !== null 
                    ? filtered.map(
                        contact=>(
                            <ContactItem key={contact.id} contact={contact}/>
                        ))
                    : contacts.map(
                        contact=>(
                            <ContactItem key={contact.id} contact={contact}/>
                        ))
                }
            </div>
        </Fragment>
    )
}

export default Contacts
