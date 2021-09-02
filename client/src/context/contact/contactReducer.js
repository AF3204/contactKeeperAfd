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

export default(state,action)=>{
    switch(action.type){
        case GET_CONTACTS:
        return {
            ...state,
            contacts: action.payload,
            loading: false
        };
        case ADD_CONTACT:
            /**
             * 20210902 - if you switch the state and the action
             * then the action comes first before the state
             *  */ 
            return{
                ...state,
                contacts: [action.payload,...state.contacts],
                loading:false
            }
        /**
         * 20210806 - Update works a little different
         *            We map it with the changed state/contact
         *            if the changed ID matches with the payload,
         *            then we get the changed.
         *            else, the reducer will return the original
         */
        case UPDATE_CONTACT:
            return{
                ...state,
                contacts: state.contacts.map(contact=>
                    contact._id === action.payload._id
                    ?action.payload
                    :contact)
            }
        case DELETE_CONTACT:
            /**
             * 20210806 - Filtering out by contact.id does 
             *              not include the action payload
             * */ 
            // 20210902 - Now using _id instead of id
            
            return {
                ...state,
                contacts:state.contacts.filter(
                    contact=> contact._id !== action.payload)
            }
        case CLEAR_CONTACTS:
            return{
                ...state,
                contacts:null,
                filtered:null,
                error:null,
                current:null
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
        case FILTER_CONTACTS:
            // Filtering contacts
            return{
                ...state,
                filtered: state.contacts.filter(contact=>{
                    const regex = new RegExp(`${action.payload}`,'gi')
                    return contact.name.match(regex) || contact.email.match(regex);
                })
            }
        case CLEAR_FILTER:
            // Filtered is needed to be nulled here
            return{
                ...state,
                filtered:null
            }
        case CONTACT_ERROR:
            return{
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}