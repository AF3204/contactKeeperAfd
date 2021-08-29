import React, {useReducer} from 'react'
import {v4 as uuid} from 'uuid'
import AuthContext from './authContext'
import authReducer from './authReducer'
import axios from 'axios'

// Calling the token setting
import setAuthToken from '../../utils/setAuthToken'

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

    // Configuration for Axios. 
    // @todo Make sure the Axios can be made global
    const config ={
      headers:{
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      baseURL: 'http://localhost:5050/',
    }
    
    // Load User
    const loadUser = async () =>{
      try {
        // If token exist
        if(localStorage.token){
          setAuthToken(localStorage.token)
        }

        const res = await axios.get('api/auth')

        dispatch({
          type:USER_LOADED,
          payload: res.data
        })
      } catch (error) {
        console.log(error)
        dispatch({
          type:AUTH_ERROR,
          payload: error.response
        })
      }
    }

    // Register User
    const register = async formData =>{
      
      try{
        // Format for axios: url, forms/information, configuation
        const res = await axios.post('/api/users', formData,config);
        // Upon Success
        dispatch({
          type:REGISTER_SUCCESS,
          payload: res.data
        })
        loadUser()
      }catch(err){
        // Using ID to get the error messages
        console.log(err.response.data.id)
        
        // Upon Failure
        dispatch({
          type:REGISTER_FAIL,
          payload: err.response.data.id
        })
      }
    }

    // Login User
    const login = async formData =>{
      try{
        // Format for axios: url, forms/information, configuation
        const res = await axios.post('/api/auth', formData,config);
        // Upon Success
        dispatch({
          type:LOGIN_SUCCESS,
          payload: res.data
        })
        loadUser()
      }catch(err){
        // Using ID to get the error messages
        console.log(err.response.data)
        
        // Upon Failure
        dispatch({
          type:LOGIN_FAIL,
          payload: err.response.data
        })
      }
    }

    // Logout - Dispatch to the reducer; No payload
    const logout = () =>dispatch({
      type: LOGOUT
    })

    // Clear Errors
    const clearError = () =>dispatch({
      type: CLEAR_ERRORS
    })

    return (
        <AuthContext.Provider
          value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            loadUser,
            login,
            logout,
            clearError
          }}
        >
          {props.children}
        </AuthContext.Provider>
      );
    }

export default AuthState