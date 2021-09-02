import React, {useReducer} from 'react'
// 20210902 - Removed uuid
// import {v4 as uuid} from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from '../types.js'

// 20210901 - Adding Axios
import axios from 'axios'

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
        contacts:[],
        current: null,
        filtered:null,
        error:null
    }

    // 20210901 - We will take from the DB
    // const initialState = {
    //   contacts:[
    //       {
    //           id:1,
    //           name:'Test1',
    //           email:'t1@g.com',
    //           phone:'0127656781',
    //           type:'Personal',
    //       },
    //       {
    //           id:2,
    //           name:'Test2',
    //           email:'t2@g.com',
    //           phone:'0127656782',
    //           type:'Personal',
    //       },
    //       {
    //           id:3,
    //           name:'Test3',
    //           email:'t3@g.com',
    //           phone:'0127656783',
    //           type:'Professional',
    //       }
    //   ],
    //   current: null,
    //   filtered:null,
    //   error:null
    // }

    // 20210806 - To view the content in the current
    // console.log(initialState.current);

    const [state, dispatch] = useReducer(contactReducer, initialState)
    
    // 20210902 - Adding GET_CONTACTS
    const getContact = async () =>{

      const config ={
        baseURL: 'http://localhost:5050/',
      }
      
      try {
        const res = await axios.get('/api/contacts',config)
        dispatch({
          type:GET_CONTACTS,
          payload:res.data})  

      } catch (err) {
        console.log(err);
        dispatch({
          type:CONTACT_ERROR,
          payload:err.response})  
      }
      
    }

    // 20210901 - We will be making it interactive
    // Add Contact
    const addContact = async contact =>{
      // contact.id = uuid.v4
      const config={
        headers:{
          'Content-Type':'application/json'
        }
      }
      // 20210901 - Now adding into Axios
      try {
        const res = await axios.post('/api/contacts',contact, config)
        dispatch({type:ADD_CONTACT,payload:res.data})  

      } catch (err) {
        console.log(err);
        dispatch({type:CONTACT_ERROR,payload:err.response})  
      }
    }

    // Delete Contact
    // 20210902 - Updating with Axios
    const deleteContact = async(_id) =>{
      const config ={
        baseURL: 'http://localhost:5050/',
      }
      try {
        const res = await axios.delete(`/api/contacts/${_id}`,config)
        dispatch({type:DELETE_CONTACT,payload:_id})  

      } catch (err) {
        console.log(err);
        dispatch({type:CONTACT_ERROR,payload:err.response})  
      }
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
    const updateContact = async(contact) =>{
      const config={
        headers:{
          'Content-Type':'application/json'
        }
      }
      // 20210901 - Now adding into Axios
      try {
        const res = await axios.put(`/api/contacts/${contact._id}`,contact, config)
        dispatch({
          type:UPDATE_CONTACT,
          payload:res.data
        })  

      } catch (err) {
        console.log(err);
        dispatch({type:CONTACT_ERROR,payload:err.response})  
      }
    }
    
    // Filter Contacts
    const filterContacts = filtered =>{
      dispatch({type:FILTER_CONTACTS, payload:filtered})
    }

    // Filter Contacts
    const clearFilter = () =>{
      dispatch({type:CLEAR_FILTER})
    }

    // Clear Contacts
    const clearContact = () =>{
      dispatch({type:CLEAR_CONTACTS})
    }

    return (
        <ContactContext.Provider
          value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            getContact,
            addContact,
            updateContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            filterContacts,
            clearFilter,
            clearContact
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