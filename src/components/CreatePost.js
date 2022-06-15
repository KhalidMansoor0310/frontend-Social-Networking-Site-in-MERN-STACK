import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import {Helmet} from 'react-helmet'

function CreatePost() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();
    const { _id, name } = useSelector(state => state.auth.user)
    const { create_errors, redirect } = useSelector(state => state.posts)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch({ type: 'SET_LOADER' });
            const { data: { msg } } = await axios.post('http://localhost:5000/api/posts/create_post', {
                title,
                description,
                imageUrl,
                _id,
                name,
                author
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }

            )
            dispatch({ type: 'CLOSE_LOADER' });
            dispatch({ type: "REMOVE_ERRORS" })
            dispatch({ type: "REDIRECT_TRUE" });
            dispatch({ type: 'SET_MESSAGE', payload: msg });
        } catch (error) {
            const { errors } = error.response.data;
            dispatch({ type: 'CREATE_POST_ERRORS', payload: errors });
            dispatch({ type: 'CLOSE_LOADER' });
            dispatch({ type: 'REDIRECT_FALSE' });
        }
    }
    useEffect(() => {
        if (redirect) {
            history.push('/dashboard')
        }
        if (create_errors.length !== 0) {
            create_errors.map(error => {
                toast.error(error.msg);
            })

        }
    }, [create_errors, redirect])


    return (
        <div className="container my-5">
            

            <div className="row">
                <div className="col-md-6 my-5">
                    <Toaster
                        position="top-right"
                    />
                    <form className='bg-white p-5' onSubmit={handleSubmit}>
                        <h2 className='bg-success d-block w-100 p-5 text-white'>Create New Post</h2>
                        <div className="form-group my-3">
                            <label htmlFor="Title">Enter Post Title</label>
                            <input type="text"
                                className="form-control"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="Title">Enter Image Url</label>
                            <input type="text"
                                className="form-control"
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="Title">Enter Auhtor Name</label>
                            <input type="text"
                                className="form-control"
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </div>
                        <div className="form-group my-3">
                            <textarea name="description" className='form-control' onChange={(e) => setDescription(e.target.value)} id="desc" cols="30" rows="10">

                            </textarea>
                        </div>
                        <button type='submit' className='btn btn-success'>Create Post</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePost
