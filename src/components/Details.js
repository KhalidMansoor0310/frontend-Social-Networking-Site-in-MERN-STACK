import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import moment from 'moment'
import Avatar from 'react-avatar';

import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import Comment from './Comment'
import { Helmet } from 'react-helmet'
function Details() {
    const [comment, setComment] = useState('');
    const { id } = useParams()
    const dispatch = useDispatch()
    const { details, loading, message, comments } = useSelector(state => state.posts)
    const { user:{name} } = useSelector(state => state.auth);
    // get post details from redux
    const getDetails = async (e) => {
        dispatch({ type: 'SET_LOADER' })
        try {
            const { data: { post, comments } } = await axios.get(`http://localhost:5000/api/posts/details/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(post, comments)
            dispatch({ type: 'CLOSE_LOADER' })
            dispatch({ type: "SET_COMMENTS", payload: comments })
            dispatch({ type: 'SET_DETAILS', payload: post })

        } catch (error) {
            console.log(error)
            dispatch({ type: 'CLOSE_LOADER' })

        }
    }
    const handleComment = async (e) => {
        e.preventDefault();
        dispatch({ type: 'SET_LOADER' })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        try {
            const { data } = await axios.post(`http://localhost:5000/api/posts/comment`, {
                id: details._id,
                comment: comment,
                name: name,
            }, config)
            dispatch({ type: 'CLOSE_LOADER' })
            // dispatch({ type: "SET_COMMENTS", payload: data})
            dispatch({ type: "SET_MESSAGE", payload: data.msg })
            toast.success(data.msg)
            getDetails();
            console.log(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDetails();
    }, [id])

    return (
        <div className="container">
            <Helmet>
                <title>Post Details | chatCluk</title>
            </Helmet>
            <Toaster />
            {!loading ? <div className="row">
                <div className="col-md-6">
                    <div className="card shadow my-3 h-100" key={details._id}>
                        <div className="card-header">
                            <div className="flex-row d-flex mt-3">
                                <Avatar name={details.author} size="50" round={true} color='green' />
                                <p className='p-3'>{details.author}</p>
                                <p className='p-3'>{moment(details.createdAt).format("MMM Do YY")}</p>
                            </div>
                            <h4 className='text-success'>{details.title}</h4>
                            <p>{details.body}</p>
                        </div>
                        <div className="card-body">
                            <p>{moment(details.createdAt).fromNow()}</p>
                            <p>{details.description}</p>
                            <form action="" onSubmit={handleComment}>
                                <div className="form-group">
                                    <h4 className='text-success'>Comment</h4>
                                    <textarea className="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                        placeholder="Write your comment here"
                                        onChange={(e) => setComment(e.target.value)}


                                    ></textarea>
                                    <button className='btn btn-outline-success my-3'>Add Comment</button>
                                </div>
                            </form>

                        </div>
                        <div className="card-footer">
                            <h4 className='text-success'>Comments</h4>
                            {comments.map((comment, index) => (
                                <Comment comment={comment} key={index} />
                            ))}
                        </div>
                    </div>

                </div>
                <div className="col-md-6 my-3">
                    <img src={details.imageUrl} style={{ height: "500px", width: "100%" }} alt="" />
                </div>
            </div>


                : <Loader />}
        </div>
    )
}

export default Details
