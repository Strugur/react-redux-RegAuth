import { LOGIN ,REG,CHECK_AUTH,LOG_OUT} from './types';
import axios from 'axios'


export const lg=(username,password)=>dispatch=>{
   axios.post('api/auth', {
    username,
    password
  })
  .then(res=> {
    
    return  dispatch({
      type: LOGIN,
      payload:{
        isAuth:true,
        badLogin:false,
        showRegAuthPage:false
      }
            })
    
  })
  .catch(err=> {
 
     return dispatch({
      type: LOGIN,
      payload:{
        isAuth:false,
        badLogin:true
      }
        })
    
  });
    
}

export const reg=(username,email,password)=>dispatch=>{
  axios.post('api/register',{
    username,
    email,
    password
  })
  .then(res=> {
   
   return dispatch({
    type: REG,
    payload:res.data
      })
  })
  .catch(err=> {
    return dispatch({
        type: REG,
        payload:err.response.data
        })
  });

}

export const checkAuth=()=>dispatch=>{
  axios.get('api/profile')
  .then(res=> {
   return dispatch({
    type: CHECK_AUTH,
    payload:{
      username:res.data.username,
      isAuth:true,
      showRegAuthPage:false
    }
      })
  })
  .catch(err=> {
 
    return dispatch({
      type: CHECK_AUTH,
      payload:{
        username:null,
        isAuth:false,
        showRegAuthPage:true
      }
         })
    
  });

}

export const logout=()=>dispatch=>{
  axios.get('api/profile/logout')
  .then(res=> {
   
   return dispatch({
    type: LOG_OUT,
    payload:{
      isAuth:false,
      showRegAuthPage:true
    }
      })
  })
  .catch(err=> {
 });

}

