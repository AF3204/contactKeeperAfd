import React, {Fragment, useContext, useEffect} from 'react'
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
    // 20210902 - Added getContact and loading
    const { contacts, filtered, getContact, loading } = contactContext
    
    useEffect(() => {
        getContact();
        // eslint-disable-next-line
      }, []);

    if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
    }

    return (
        <Fragment>
            {contacts !== null && !loading 
            ? (<div>
                    {filtered !== null 
                        ? filtered.map(
                            contact=>(
                                <ContactItem key={contact._id} contact={contact}/>
                            ))
                        : contacts.map(
                            contact=>(
                                <ContactItem key={contact._id} contact={contact}/>
                            ))
                    }
                </div>)
            : ''
            }
        </Fragment>
    )
}

export default Contacts
