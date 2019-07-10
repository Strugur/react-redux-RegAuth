import React, { useState} from 'react'
import  '../styles/ProfileMenu.css'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout} from '../_actions/authAction';

const ProfileMenu=props =>{
  const[show,setShow]=useState(false)

  const logout = ()=>{
    props.logout();
  }

  const showMenu = ()=>{
    setShow(true)
  }
  const hideMenu = ()=>{
    setShow(false)
  }
    return (
      
      <div onMouseOver={showMenu} onMouseLeave={hideMenu} >
      <Link to="/profile" >Profile</Link>
      {show?<div id="acc-menu" >
      <a href="/profile" className="menuRow">My Account</a>
      <a  className="logout" onClick={logout}>Log out</a>
     
  </div>:null}
  </div>
    )
  }
  ProfileMenu.propTypes = {
    logout: PropTypes.func.isRequired
  };

  const mapDispatchToProps =  ({
    logout:() =>  logout() 
    })
   
    
    export default connect(null, mapDispatchToProps)(ProfileMenu);