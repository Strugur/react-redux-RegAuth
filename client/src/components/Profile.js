import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkAuth} from '../_actions/authAction';

 const Profile = props => {
     return (
      <div>
       {props.isAuth?
       <div><h3>Hi</h3>{props.username}</div>
       :null }
      </div>
    )
  
}

Profile.propTypes = {
  checkAuth: PropTypes.func.isRequired
};


const mapDispatchToProps =  ({
checkAuth:() =>  checkAuth() 
})
const mapStateToProps = state=>({
  username:state.auth.username,
  isAuth:state.auth.isAuth
} )

export default connect(mapStateToProps, mapDispatchToProps)(Profile);