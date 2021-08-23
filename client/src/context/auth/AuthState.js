import React, {useReducer} from 'react'
import {v4 as uuid} from 'uuid'
import AuthContext from './authContext'
import authReducer from './authReducer'
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

const AuthState = (props) =>{

    /**
     *  Token will be stored in the local storage
     */
    
    const initialState = {
        token:localStorage.getItem('token'),
        isAuthenticated: null,
        loading:true,
        error:null,
        user:null
    }

    // 20210806 - To view the content in the current
    // console.log(initialState.current);

    const [state, dispatch] = useReducer(authReducer, initialState)
    
    // Load User

    // Register User

    // Login User

    // Logout

    // Clear Errors

    return (
        <AuthContext.Provider
          value={{
            token:state.token,
            isAuthenticated: state.isAuthenticated,
            loading:state.loading,
            user: state.user,
            error:state.error
          }}
        >
          {props.children}
        </AuthContext.Provider>
      );
    }

export default AuthState