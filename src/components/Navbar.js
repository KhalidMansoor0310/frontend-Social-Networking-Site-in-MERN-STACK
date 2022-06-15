import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
// import './Styles/Navbar.css'
function Navbar() {
  const { user } = useSelector(state => state.auth);


  const dispatch = useDispatch();
  const links = user ? (
    <>
      <li className='nav-link p-0'>
        <span className="nav-link text-white" onClick={() => dispatch({ type: "LOGOUT" })}>Logout
          {/* logout icon  */}
          <i className="fas fa-sign-out-alt p-3"></i>
        </span>
      </li>
      <NavLink to="/create" className='nav-link text-white'>Create Post 
      {/* post icon  */}
      <i className="fas fa-plus-circle p-3"></i>
      </NavLink>
      <li className="nav-item">
        <NavLink className="nav-link active text-white" aria-current="page" to="/dashboard">Dashbaord
        {/* dashboard icon  */}
        <i className="fas fa-tachometer-alt p-3"></i>
         </NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link active text-white" aria-current="page" to="/MyQuestions">My Questions
        {/* question icon  */}
        <i className="fas fa-question-circle p-3"></i>
        </NavLink>
      </li>
      


    </>
  ) : (
    <>
      <NavLink to="/login" className="nav-link text-white">Login
        {/* login icon  */}
        <i className="fas fa-sign-in-alt p-3"></i>
      </NavLink>
      <NavLink to="/register" className="nav-link text-white">Register
        {/* register icon  */}
        <i className="fas fa-user-plus p-3"></i>
      </NavLink>





    </>
  )
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success text-white ">
      <div className="container-fluid">
        <a className="navbar-brand text-center" href=""><h2>ChatCluck</h2></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto p-2">
            <li className="nav-item">
              <NavLink className="nav-link active text-white" aria-current="page" to="/">Home
                {/* home icon font awesome  */}
                <i className="fas fa-home p-3"></i>
              </NavLink>
            </li>
            {links}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
