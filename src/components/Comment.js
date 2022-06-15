import React, { useEffect } from 'react'
import Avatar from 'react-avatar'
import moment from 'moment'
import { BsPencil, BsArchive } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {toast,Toaster} from 'react-hot-toast';
import { useDispatch } from 'react-redux';


function Comment({ comment }) {
  const dispatch = useDispatch()
  const deleteComment = async(id) => {
    dispatch({ type: 'SET_LOADER' });
    try {
      const res = await axios.delete(`http://localhost:5000/api/posts/deleteComment/${id}`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      dispatch({ type: 'CLOSE_LOADER' });
      dispatch({ type: 'SET_MESSAGE', payload: res.data.msg });
      toast.success(res.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    } catch (error) {
      console.log(error);
    }
  }
  

  

  return (
    <div className="card my-3">
      <Toaster/>
      <div className="card-header">
        <div className="flex-row d-flex mt-3">
          <Avatar name={comment.name} size="50" round={true} color='green' />
          <p className='p-3'>{comment.name}</p>
          {/* delete font awesome icons */}
          <i className="fas fa-trash-alt p-3 text-danger" onClick={e=>deleteComment(comment._id)} style={{ color: '#00b894' }}></i>
        </div>
        <div className="card-footer">
          <p className='p-3'>{comment.comment}</p>
          <p className='p-3'>{moment(comment.createdAt).format("MMM Do YY")}</p>
        </div>
      </div>
    </div>
  )
}

export default Comment
