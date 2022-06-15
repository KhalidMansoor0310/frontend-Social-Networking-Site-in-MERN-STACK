import React from 'react'
import { useSelector } from 'react-redux'
import { Route,Redirect } from 'react-router-dom';
function RouteLinks(props) {
    const {user} = useSelector(state=>state.auth);
  return (
    user ? <Redirect to="/dashboard"/>:<Route path={props.path} component={props.component}/>
  )
}

export default RouteLinks