import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';

function Edit() {
    const dispatch = useDispatch();
    const {id} = useParams();
 

    const {post} = useSelector(state => state.posts);
    // console.log(post);
    const getPost = async(e) => {
       dispatch({type:'LOADER'});
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
            const {data:{post}} = await axios.get(`http://localhost:5000/api/posts/post/${id}`, config);
            console.log(post);
            dispatch({type:"CLOSE_LOADER"});
            dispatch({type:'SET_POST',payload:post});

            
        }
        catch(error){
            console.log(error)
            dispatch({type:"CLOSE_LOADER"});
        }
    }
    useEffect(() => {
        getPost();
    }, [id])

    
    // const updatePost = async(e) => {
    //     e.preventDefault();
    //     dispatch({type:'SET_LOADER'});
    //     try{
    //         const config = {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${localStorage.getItem('token')}`
    //             }
    //         }
            
    //         const {data:{message}} = await axios.put(`http://localhost:5000/api/posts/edit`, {
    //             formdata,
    //             id
    //         }, config);
    //         dispatch({type:"CLOSE_LOADER"});
    //         console.log(message);
           
           
    //     }
    //     catch(error){
    //         console.log(error)
    //         dispatch({type:"CLOSE_LOADING"});
    //     }
    // }


  return (
    <div className="container my-5">
    <div className="row">
        <div className="col-md-6 my-5">
            {/* <Toaster
                position="top-right"
            /> */}
            {/* <form className='bg-white p-5' onSubmit={updatePost}>
                <h2 className='bg-success d-block w-100 p-5 text-white'>Edit Your Post</h2>
                <div className="form-group my-3">
                    <label htmlFor="Title">Enter Post Title</label>
                    <input type="text"
                        className="form-control"
                        onChange={handleChange}
                        value={post.title}
                        name="title"
                    />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="Title">Enter Image Url</label>
                    <input type="text"
                        className="form-control"
                        onChange={handleChange}
                        value={post.imageUrl}
                        name="imageUrl"
                    />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="Title">Enter Auhtor Name</label>
                    <input type="text"
                        className="form-control"
                        onChange={handleChange}
                        value={post.author}
                        name="author"
                    />
                </div>
                <div className="form-group my-3">
                    <textarea  className='form-control'  
                    onChange={handleChange}
                    value={post.description}
                    name="description"
                    id="desc" cols="30" rows="10">
                            
                    </textarea>
                </div>
                <button type='submit' className='btn btn-success'>Update Post</button>
            </form> */}
        </div>
    </div>
</div>
  )
}

export default Edit
