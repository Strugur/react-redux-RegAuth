import React, {useState} from 'react'
import '../styles/Login.css'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {lg, checkAuth} from '../_actions/authAction';
import { Link } from "react-router-dom";

const Login = props => {
    const [username,setUserName] = useState(null);
    const [password,setPassword] = useState(null);
    const [noMatch,setNoMatch] = useState(null);

    const handleName = (e) => {
        setUserName(e.target.value);
    }
    const handlePass = (e) => {
        setPassword(e.target.value);
    }

    const login = () => {
        if (username && password) {
            props.lg(username, password)
           
        } else {
         setNoMatch(true);
        }
    }

    return (
        
        <div className="login-container">

         <div className="header">
                <div className="image"></div>

                
                {props.badLogin || noMatch? <div className="errMsg">Incorrect username or password</div>: null}

            </div >
        {!props.isAuth &&
            
            <div className="main">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">
                                <h3>Login</h3>
                            </div>
                            <div className="card-body">
                                
                                <div className="form-group">
                                    <label htmlFor="username">Email address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        onChange={handleName}/>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        onChange={handlePass}/>

                                </div>

                                <button className="btn btn-primary" onClick={login}>Login</button>
                                <div className="reg-link">
                                New Here?
                                <Link  to="/register"  >Register</Link>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        
            <div className="footer"></div>
            
        </div>

    )

}

Login.propTypes = {
    lg: PropTypes.func.isRequired,
    checkAuth: PropTypes.func.isRequired
};

const mapDispatchToProps = ({
    lg: (username, password) => lg(username, password),
    checkAuth: () => checkAuth()
})

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    badLogin:state.auth.badLogin
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
