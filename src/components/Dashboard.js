import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../components/Loader';
import { BsPencil, BsArchive } from 'react-icons/bs';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Sidebar from './Sidebar';
import moment from 'moment';
import { Helmet } from 'react-helmet';


function Dashboard() {
  const { redirect, message } = useSelector(state => state.posts)
  const { user: { _id } } = useSelector(state => state.auth);
  const { posts, loading,comments } = useSelector(state => state.posts)
  const dispatch = useDispatch();
  const deletePost = async (id) => {
    dispatch({ type: 'SET_LOADER' });
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      const { data: { msg } } = await axios.delete(`http://localhost:5000/api/posts/delete/${id}`, config);
      // console.log(msg);
      dispatch({ type: 'CLOSE_LOADER' });
      fetchPosts();
      dispatch({ type: 'DELETE_POST', payload: msg });
      
      toast.success(msg);
    }
    catch (error) {
      toast.error(error.message);
    }
  }



  const fetchPosts = async () => {
    dispatch({ type: 'SET_LOADER' });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    try {
      const { data: { response } } = await axios.get(`http://localhost:5000/api/posts/fetchpost/${_id}`, config);
      dispatch({ type: 'CLOSE_LOADER' });
      dispatch({ type: 'SET_POSTS', payload: response });
    } catch (error) {
      dispatch({ type: 'CLOSE_LOADER' });
    }
  }
  useEffect(() => {
    if (redirect) {
      dispatch({ type: 'REDIRECT_FALSE' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "REMOVE_MESSAGE" })
    }

    fetchPosts();
  }, [message, redirect, dispatch])

  return (
    <div className="container my-5 " >

      <Toaster
        toastOptions={{
          style: {
            fontSize: '14px'
          }
        }}
      />
      <div className="row">
        
      <Helmet>
                <title>My Posts | chatCluk</title>
            </Helmet>
        <div className="col-md-4 col-sm-12">
          <Sidebar />
        </div>
        <div className="col-md-8 col-sm-12 my-3">
          {!loading ? <div className="row" >
            {
              posts.map(post => (

                <div className="card shadow" key={post._id}>
                  <div className="header">
                    <img src={post.imageUrl} style={{ width: '100%', height: "300px" }} alt="" />
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="d-flex">
                        <h5 className="card-title pt-4">{post.title}</h5>
                        <p className="card-text p-4">{post.author}</p>

                      </div>
                    </div>
                    <p className="card-text">{post.description}</p>
                    <p className='card-text'>{moment(post.createdAt).fromNow()}</p>
                    <div className="row">
                      <div className="d-flex">
                        <Link to={`/edit/${post._id}`} className='btn btn-success m-2'>
                          <BsPencil className='icon' />
                        </Link>
                        <Link to={'/dashboard'} className='btn btn-danger m-2'>
                          <BsArchive className='icon' onClick={() => deletePost(post._id)} />
                        </Link>
                        
                      </div>

                    </div>
                  </div>
                </div>

              ))

            }
          </div> : <Loader />}
        </div>
      </div>

    </div>
  )
}

export default Dashboard
