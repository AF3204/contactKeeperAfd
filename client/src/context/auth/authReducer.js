import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types.js'

export default(state,action)=>{
    switch(action.type){
        case REGISTER_SUCCESS:
            /**
             * For success, we have the token stored in the localStorage
             * For loading, it will now give true to show completion
             */ 
            localStorage.setItem('token', action.payload.token)
            return{
                ...state,
                ...action.payload,
                loading:true,
                isAuthenticated:true 
            }
        case REGISTER_FAIL:
            /**
             * If failed, remove the token
             * Null the user to allow for new entries
             * Error: take from the payload to show what is the error
             */
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload

            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state
    }
}