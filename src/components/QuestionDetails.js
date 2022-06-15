import axios from 'axios';
import React, { useState } from 'react'
import moment from 'moment';
import Avatar from 'react-avatar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast'
function QuestionDetails() {
    const { id } = useParams();
    const [Answer, setAnswer] = useState('');
    const dispatch = useDispatch();
    const { questionDetails } = useSelector(state => state.QuestionReducer);

    const getDetails = async (e) => {
        dispatch({ type: 'SET_LOADER' })
        try {
            const { data: { question } } = await axios.get(`http://localhost:5000/api/question/details/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(question)
            dispatch({ type: 'CLOSE_LOADER' })
            dispatch({ type: 'SET_QUESTION_DETAILS', payload: question })
        } catch (error) {
            console.log(error)
            dispatch({ type: 'CLOSE_LOADER' })
        }
    }
    useEffect(() => {
        getDetails();
    }, [dispatch]);

    const handleAnswer = async (e) => {
        e.preventDefault();
        dispatch({ type: 'SET_LOADER' })

        try {
            const data = await axios.post(`http://localhost:5000/api/question/answer`, {
                id: questionDetails._id,
                Answer: Answer,
                name: questionDetails.author,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(data)
            dispatch({ type: 'CLOSE_LOADER' })
            dispatch({ type: "SET_ANSWERS", payload: data })
            dispatch({ type: "SET_MESSAGE", payload: data.msg })
            toast.success(data.msg)

            console.log(data)

            setAnswer('')
        } catch (error) {
            console.log(error)
            dispatch({ type: 'CLOSE_LOADER' })
        }
    }

    return (
        <div className='container my-5'>
            <div className="col-md-6 shadow">
                <Toaster />
                <div className="card-header">
                    <div className="flex-row d-flex mt-3">
                        <Avatar name={questionDetails.author} size="50" round={true} color='green' />
                        <p className='p-3'>{questionDetails.author}</p>
                        <p className='p-3'>{moment(questionDetails.createdAt).format("MMM Do YY")}</p>
                    </div>
                    <h4 className='text-success'>{questionDetails.title}</h4>

                </div>
                <div className="card-body">
                    <p>{moment(questionDetails.createdAt).fromNow()}</p>
                    <p>{questionDetails.description}</p>
                    <form action="" onClick={handleAnswer}>
                        <div className="form-group">
                            <h4 className='text-success'>Answer</h4>
                            <textarea className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                placeholder="Write your Answer here"
                                onChange={(e) => setAnswer(e.target.value)}


                            ></textarea>
                            <button className='btn btn-outline-success my-3'>Add Answer</button>
                        </div>
                    </form>

                </div>
                {/* <div className="card-footer">
                            <h4 className='text-success'>Comments</h4>
                            {comments.map((comment, index) => (
                                <Comment comment={comment} key={index} />
                            ))}
                        </div> */}
            </div>

        </div>

    )
}

export default QuestionDetails
