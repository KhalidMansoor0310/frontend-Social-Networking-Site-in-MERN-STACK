import axios from 'axios'
import React, { useEffect } from 'react'
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import toast, { Toaster } from 'react-hot-toast';
import { BsArchive, BsPencil } from 'react-icons/bs'
import { Link } from 'react-router-dom';
function MyQuestions() {

    const dispatch = useDispatch();
    const { my_questions, questionMessage } = useSelector(state => state.QuestionReducer);
    const { user:{_id} } = useSelector(state => state.auth);

    const fetchAllQuestions = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/question/my_questions/' + _id);
            console.log(data)
            dispatch({ type: 'GET_QUESTIONS', payload: data.questions });

            dispatch({ type: 'CLOSE_LOADING' });
        } catch (err) {
            dispatch({ type: 'QUESTION_ERROR', payload: err.response.data.msg });
        }
    }

    useEffect(() => {
        fetchAllQuestions();
    }, [dispatch]);

    const deleteQuestion = async (id) => {
        try {
            const { data } = await axios.delete('http://localhost:5000/api/question/delete_question/' + id,{
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            dispatch({ type: 'DELETE_QUESTION', payload: data.question });
            toast.success(data.msg);
            fetchAllQuestions();
            dispatch({ type: 'CLOSE_LOADING' });
        } catch (err) {
            dispatch({ type: 'QUESTION_ERROR', payload: err.response.data.msg });
        }
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <Toaster />
                    <h1 className='my-3'>My Questions</h1>
                    {
                        my_questions.map(question => {
                            return (
                                <div className="card my-2 shadow" key={question._id}>
                                    <div className="card-header">
                                        <div className='d-flex'>

                                            <p className='p-2'>{question.author}</p>
                                            <p className='p-2'>{moment(question.createdAt).fromNow()}</p>
                                            <i className="fas fa-question p-2"></i>
                                        </div>

                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-10">
                                                <h4>{question.title}</h4>
                                                <p className='text-success'>{question.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="row">
                                            <div className="d-flex">
                                                {/* <Link to={`/edit/${question._id}`} className='btn btn-success m-2'>
                                                    <BsPencil className='icon' />
                                                </Link> */}
                                                <Link to={'/MyQuestions'} className='btn btn-danger m-2'>
                                                    <BsArchive className='icon' onClick={() => deleteQuestion(question._id)} />
                                                </Link>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default MyQuestions
