/** 
 * Creating a private route if authenticated
*/
import React, {useContext} from 'react'
import AuthContext from '../../context/auth/authContext'
import {Route, Redirect} from 'react-router-dom'

/**
 * 
 * @param {component, rest} components of the item that is being sent
 * @returns 
 */
const PrivateRoute = ({
    component:Component,
    ...rest
}) => {

    // Initalising
    const authContext = useContext(AuthContext)

    // DEconstructing
    const {isAuthenticated, loading} = authContext;

    /**
     * Rest: What we get from the Path and Component
     * Props: Properties for the object
     * Why Render? Wrapping the component in order to use the child elements
     * In this case: If authenticated -> Can use the props element. Else, redirect
     * 
     */

    return (
        <Route {...rest} render={
            props=> !isAuthenticated && !loading
            ?(<Redirect to='/login'/>)
            :(<Component {...props}/>)
        }/>
    )
}

export default PrivateRoute 
