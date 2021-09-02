import React, {useContext, Fragment} from "react";
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'


const Navbar = ({title, icon}) =>{

    // Call the context
    const authContext = useContext(AuthContext)
    // 20210902 - Clearing the users contact list
    const contactContext = useContext(ContactContext)

    // Deconstruct
    const {isAuthenticated, logout, user} = authContext
    const {clearContact} = contactContext

    // Creating logout
    const onLogout = () =>{
        logout()
        clearContact()
    }
    /**
     * Since mine is msg-> so the response is user.msg
     */
    // Authenticated Links
    const authLinks = (
        <Fragment>
            <li>Welcome {user && user.msg.name}</li>
            <li> <Link to='/'>Home</Link></li>
            <li>
             <a onClick={onLogout} href='#!'>
                <i className='fas fa-sign-out-alt'/>
                <span className='hide-sm'> Logout</span>
             </a>
            </li>
        </Fragment>
    )

    // Guest Links
    const guestLinks = (
        <Fragment>
            <li> <Link to='/register'>Register</Link></li>
            <li> <Link to='/login'>Login</Link></li>
            <li> <Link to='/about'>About</Link></li>
        </Fragment>
    )

    return (
        <div className='navbar bg-primary'>
            <h1><i className ={icon}/> {title}</h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    )
}

Navbar.propTypes={
    title: PropTypes.string.isRequired,
    icon:PropTypes.string,
}

Navbar.defaultProps={
    title:'Contact Keeper',
    icon:'fas fa-sticky-note'
}

export default Navbar