import './App.css';
import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home'
import About from './components/pages/About'

// Contact
import ContactState from './context/contact/ContactState';

const App=()=>{
  return (
    <ContactState>
      <Router>
        <Fragment>
          <Navbar/>
        </Fragment>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/about' component={About}/>
        </Switch>
          
      </Router>
    </ContactState>
  );
}

export default App;
