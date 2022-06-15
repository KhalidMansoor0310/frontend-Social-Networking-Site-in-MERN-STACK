import React from 'react'
import { Link } from 'react-router-dom'
import './Styles/Sidebar.css'
import Avatar from 'react-avatar'
import { useSelector } from 'react-redux'

function Sidebar() {
  const { user: { _id } } = useSelector(state => state.auth);
  return (

    <div className="card shadow my-3">
      <div className="card-header">
        <div className="flex-row d-flex my-3">
          <Avatar name='Profile' color='green' size="50" round={true} />
          <p className='p-3'>Dashboard</p>
        </div>
      </div>
      <div className="card-body">
        <ul className="list-group">
        <li className="list-group-item">
            <Link to={`/AddQuestion`} className='link_one'>
              <i className="fas fa-user-circle p-3"></i> Add a Question
            </Link>
          </li>
          <li className="list-group-item">
            <Link to={`/Account_details/${_id}`} className='link_one'>
              <i className="fas fa-user-circle p-3"></i> View Account Details
            </Link>
          </li>
          {/* <li className="list-group-item">
            <Link to={`/createProfile/${_id}`} className='link_one'>
              <i className="fas fa-user-circle p-3"></i> Create Profile
            </Link>
          </li> */}
           <hr />
          <li className='list-group-item'>
              Account Settings
          </li>
          <li className="list-group-item">
            <Link to='/updateName' className='link_one'>
              <i className="fas fa-key  p-3"></i> Change Name
            </Link>
          </li>
          <li className="list-group-item">
            <Link to='/updatePassword' className='link_one'>
              <i className="fas fa-sign-out-alt p-3 "></i> Change Password
            </Link>
          </li>
        </ul>
      </div>

    </div>

  )
}

export default Sidebar
