import React, {useEffect} from 'react'
import ProfileMenu from './ProfileMenu'
import '../styles/NavBar.css'
import {Link} from "react-router-dom";

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {checkAuth} from '../_actions/authAction';

const NavBar = props => {
    useEffect(()=>{  
         props.checkAuth(); 
},[props.isAuth]);

    return (
        <div className="NavBar">

            <div className="LeftNav">
                <Link to="/home">Home</Link>

            </div>

            <div className="RightNav">

                {props.isAuth
                    ? <ProfileMenu/>
                    : <Link to="/login">Login</Link>}

            </div>

        </div>
    )

}

NavBar.propTypes = {
    checkAuth: PropTypes.func.isRequired
};

const mapDispatchToProps = ({
    checkAuth: () => checkAuth()
})
const mapStateToProps = state => ({isAuth: state.auth.isAuth})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
