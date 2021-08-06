import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types.js'

export default(state,action)=>{
    switch(action.type){
        case ADD_CONTACT:
            return{
                ...state,
                contacts: [...state.contacts,action.payload]
            }
        case DELETE_CONTACT:
            /**
             * 20210806 - Filtering out by contact.id does 
             *              not include the action payload
             * */ 
            return {
                ...state,
                contacts:state.contacts.filter(
                    contact=> contact.id !== action.payload)
            }
        case SET_CURRENT:
            /**
             * 20210806 - We send into the current to maintain/update the contact
             */
            return {
                ...state,
                current:action.payload
            }
        case CLEAR_CURRENT:
            /**
             * 20210806 - Nullify current
             */
            return {
                ...state,
                current:null
            }
        default:
            return state
    }
}