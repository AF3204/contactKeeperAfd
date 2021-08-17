import './App.css';
import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home'
import About from './components/pages/About'

// Contact
import ContactState from './context/contact/ContactState';
// 20210816 - Auth
import AuthState from './context/auth/AuthState';
// 20210817 - Register & Login-> This is a link
import Register from './components/auth/Register';
import Login from './components/auth/Login';


const App=()=>{
  /**
   * 20210816 - Added the Auth 
   */
  return (
    <AuthState>
      <ContactState>
      <Router>
        <Fragment>
          <Navbar/>
        </Fragment>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/login' component={Login}/>
        </Switch>
          
      </Router>
    </ContactState>
    </AuthState>
    
  );
}

export default App;
