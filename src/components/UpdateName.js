import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import {useHistory} from "react-router-dom";
import axios from 'axios';
import { Helmet } from 'react-helmet';
function UpdateName() {
    const [userName, setUserName] = useState('');
    const dispatch = useDispatch();
    const { user: { name,_id } } = useSelector(state => state.auth);
    const {loading,redirect} = useSelector(state => state.posts)
    const {updateErrors} = useSelector(state=>state.profile)
    const history = useHistory();
    useEffect(() => {
        setUserName(name);
    }, [])
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
    })
    



    const handleName = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        try {
            dispatch({ type: 'SET_LOADER' });
            const { data } = await axios.post(`http://localhost:5000/api/profile/`, {
                name: userName,
                id:_id
            }, config);
            dispatch({ type: 'CLOSE_LOADER' });
            localStorage.setItem('token', data.token);
            dispatch({ type:'SET_TOKEN',payload:data.token });
            dispatch({ type: 'SET_MESSAGE', payload: data.msg });
            dispatch({ type: 'REDIRECT_TRUE' });
            
            console.log(data)
        } catch (error) {
            dispatch({ type: 'CLOSE_LOADING' });
            dispatch({ type: 'SET_PROFILE_ERRORS', payload: error.response.data.errors });
            console.log(error.response.data.errors)
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                <Helmet>
                <title>Update Profile Name | chatCluk</title>
            </Helmet>
                    <Toaster/>
                    <div className="card my-5 p-5">
                        <form action="" onSubmit={handleName}>
                            <div className="form-group">
                                <label htmlFor="">Name</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Enter Name"
                                    onChange={(e) => setUserName(e.target.value)}
                                    value={userName}
                                />
                                <button className="btn btn-dark mt-3">Update Name</button>
                            </div>
                        </form>
                    </div>
                </div>
                <Sidebar />

            </div>
        </div>
    )
}

export default UpdateName
