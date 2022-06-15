import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute(props) {
    console.log(props)
    const {user} = useSelector(state=>state.auth);
    console.log(user)
  return (
    user ? <Route path={props.path} exact={props.exact} component={props.component}/> : <Redirect to="/login"/>
  )
}

export default PrivateRoute