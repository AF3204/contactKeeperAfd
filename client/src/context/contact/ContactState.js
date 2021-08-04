import React, {useReducer} from 'react'
import uuid from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types.js'

const ContactState = (props) =>{

    const initialState = {
        contacts:[
            {
                id:1,
                name:'Test1',
                email:'t1@g.com',
                phone:'0127656781',
                type:'Personal',
            },
            {
                id:2,
                name:'Test2',
                email:'t2@g.com',
                phone:'0127656782',
                type:'Personal',
            },
            {
                id:3,
                name:'Test3',
                email:'t3@g.com',
                phone:'0127656783',
                type:'Professional',
            }
        ]
    }

    const [state, dispatch] = useReducer(contactReducer, initialState)
    
    // Add Contact
    
    // Delete Contact

    // Set Contact

    // Clear current contact

    // Update Contact

    // Filter Contacts

    // Clear Contacts

    return (
        <ContactContext.Provider
          value={{
            contacts: state.contacts
          }}
        >
          {props.children}
        </ContactContext.Provider>
      );
    
    // If the above does not work, then use the one below
    // return {<ContactContext.Provider
    //             value={{
    //                 contacts: state.contacts
    //             }}>
    //             {props.children}
    //         </ContactContext.Provider>}

}

export default ContactState