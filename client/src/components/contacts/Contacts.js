import React, {Fragment, useContext} from 'react'
import ContactContext from '../../context/contact/contactContext';

import ContactItem from "../contacts/ContactItem.js"


const Contacts = () => {
    // 20210804 - Using the values from the Context
    const contactContext = useContext(ContactContext)

    // 20210804 - Destructuring
    const { contacts } = contactContext
    

    return (
        <Fragment>
            <div>
                {contacts.map(contact=>(
                    <ContactItem key={contact.id} contact={contact}/>
                ))}
            </div>
        </Fragment>
    )
}

export default Contacts
