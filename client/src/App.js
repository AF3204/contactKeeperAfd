import './App.css';
import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home'
import About from './components/pages/About'

// Contact
import ContactState from './context/contact/ContactState';

// Auth
import AuthState from './context/auth/AuthState';

// Reverted on this day=> 20210823: AlertState
import AlertState from './context/alert/AlertState'
import Alerts from './components/layout/Alerts.js'
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App=()=>{
  /**
   * 20210816 - Added the Auth 
   */
  return (
    <AuthState>
      <ContactState>
      <AlertState>
        <Router>
          <Fragment>
            <Navbar/>
          </Fragment>
          <Alerts/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/about' component={About}/>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
            
        </Router>
      </AlertState>
      </ContactState>
    </AuthState>
    
  );
}

export default App;
