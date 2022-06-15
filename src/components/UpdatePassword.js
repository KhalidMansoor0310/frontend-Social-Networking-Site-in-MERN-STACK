import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import {useDispatch, useSelector} from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function UpdatePassword() {
    const {user:{_id}} = useSelector(state=>state.auth)
    const {loading,redirect,message} = useSelector(state=>state.posts)
    const {updateErrors} = useSelector(state=>state.profile)
    const history = useHistory();
    const [state,setState] = useState({
        currentPassword:'',
        newPassword:'',
        userId:null

    })
    
    const dispatch = useDispatch();

    const handlePassword=async(e)=>{
        e.preventDefault();
        dispatch({type:"SET_LOADER"})
        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        }
        try {
            const {data} = await axios.post('http://localhost:5000/api/profile/updatePassword',{
                currentPassword:state.currentPassword,
                newPassword:state.newPassword,
                userId:_id
            },config);
            dispatch({type:"CLOSE_LOADER"})
            dispatch({type:"SET_MESSAGE",payload:data.msg})
            dispatch({type:"REDIRECT_TRUE"})
            dispatch({type:"SET_MESSAGE",payload:data.msg})
            console.log(data);
            
        } catch (error) {
            dispatch({ type: 'CLOSE_LOADING' });
            dispatch({ type: 'SET_PROFILE_ERRORS', payload: error.response.data.errors });
            console.log(error.response.data.errors)
            
        }
    
    }
    useEffect(()=>{
        if(updateErrors.length > 0){

        updateErrors.map((error)=>{
            toast.error(error.msg)
        })
        dispatch({type:"PROFILE_ERROR_RESET"})
    }
    
    },[updateErrors])
    useEffect(()=>{
        if(redirect){
            history.push('/dashboard');
        }
        if(message){
            toast.success(message)
        }
    }
    ,[redirect])
    return (
        <div className="container my-5">
            <Helmet>
                <title>Password Profile Update | chatCluk</title>
            </Helmet>
            <div className="row">
                <div className="col-md-8">
                    <Toaster/>
                    <div className="card shadow p-5">
                        <form action="" onSubmit={handlePassword}>
                            <div className="form-group my-3">
                                <label htmlFor="">Current Password</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Enter current Passowrd"
                                    onChange={(e)=> setState({
                                        ...state,
                                        currentPassword:e.target.value
                                    })}
                                    value={state.currentPassword}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">New Password</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Enter new Passowrd"
                                    onChange={(e)=> setState({
                                        ...state,
                                        newPassword:e.target.value
                                    })}
                                    value={state.newPassword}
                                />
                            </div>
                            <button className='btn btn-dark my-3'>Update Password</button>
                        </form>
                    </div>
                </div>
                <Sidebar />
            </div>
        </div>
    )
}

export default UpdatePassword
