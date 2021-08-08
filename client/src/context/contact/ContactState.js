import React, {useReducer} from 'react'
import {v4 as uuid} from 'uuid'
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
    /**
     * 20210806: Current is set to an empty value
     * Current is part of the Edit feature
     * Any Edits will be stored in the current
     *  */ 
    /**
     * 20210808: Adding the Filtering feature
     *  Filtered is to filter out contacts based on given inputs
     */
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
        ],
        current: null,
        filtered:null
    }

    // 20210806 - To view the content in the current
    // console.log(initialState.current);

    const [state, dispatch] = useReducer(contactReducer, initialState)
    
    // Add Contact
    const addContact = contact =>{
      contact.id = uuid.v4
      dispatch({type:ADD_CONTACT,payload:contact})
    }
    // Delete Contact
    const deleteContact = id =>{
      dispatch({type:DELETE_CONTACT,payload:id})
    }
    // Set Contact
    const setCurrent = current =>{
      dispatch({type:SET_CURRENT,payload:current})
    }
    // Clear current contact
    const clearCurrent = () =>{
      dispatch({type:CLEAR_CURRENT})
    }
    // Update Contact
    const updateContact = contact =>{
      dispatch({type:UPDATE_CONTACT,payload:contact})
    }
    
    // Filter Contacts
    const filterContacts = filtered =>{
      dispatch({type:FILTER_CONTACTS, payload:filtered})
    }

    // Filter Contacts
    const clearFilter = () =>{
      dispatch({type:CLEAR_FILTER})
    }

    return (
        <ContactContext.Provider
          value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            addContact,
            updateContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            filterContacts,
            clearFilter
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