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
                    contact.id === action.payload.id
                    ?action.payload
                    :contact)
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