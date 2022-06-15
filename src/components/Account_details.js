import axios from 'axios'
import React, { useEffect } from 'react'
import Avatar from 'react-avatar'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


function Account_details() {
    const dispatch = useDispatch();
    const { id } = useParams()
    const { user: { _id } } = useSelector(state => state.auth);
    const {profile} = useSelector(state => state.profile);
    const getProfile = async (e) => {
        dispatch({ type: 'SET_LOADER' });
        try {
            const { data } = await axios.get(`http://localhost:5000/api/profile/getProfile/${_id}`)
            dispatch({ type: 'CLOSE_LOADER' });
            dispatch({ type: 'SET_PROFILE', payload: data })
            // console.log(data)
        } catch (error) {
            dispatch({ type: 'CLOSE_LOADER' });
            console.log(error)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])


    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <div className="card shadow my-3">
                        <div className="card-header">
                            <div className="flex-row d-flex mt-3">
                                <Avatar name={profile.name} size="50" round={true} color='green' />
                                <p className='p-3'>{profile.name}</p>
                                <p className='p-3'>{profile.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Account_details
