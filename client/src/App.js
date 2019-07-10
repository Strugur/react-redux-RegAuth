import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Switch,Redirect} from "react-router-dom";
import NavBar from './components/NavBar'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import Test from './components/Test'

import {connect} from 'react-redux';


const App = ({showRegAuthPage,isAuth})=> {
    return (
  <Router >
    <div className="app">
      <div >
       <NavBar />
       </div>      
        <div>
        <Switch>
          <Route exact path='/' component={Home} />
          {isAuth?<Route path='/profile' component={Profile} />:<Redirect from="/profile" to="/login" />}
          {showRegAuthPage?<Route path='/register' component={Register} />:<Redirect from="/register" to="/profile" />}
          {showRegAuthPage?<Route path='/login' component={Login} />:<Redirect from="/login" to="/profile" />}
          <Redirect from="*" to="/" />
        </Switch>
        </div>
      </div>
  </Router>
    
    );
  
}

const mapStateToProps = state => ({
  isAuth:state.auth.isAuth,
  showRegAuthPage: state.auth.showRegAuthPage,

})

export default connect(mapStateToProps)(App);


