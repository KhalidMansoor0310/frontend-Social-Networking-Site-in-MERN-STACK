import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import Avatar from 'react-avatar';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Home() {
  const dispatch = useDispatch();
  const { allposts, loading } = useSelector(state => state.posts);
  const {posts} = useSelector(state => state.posts);
  // console.log(posts)
  const { user: { _id, name } } = useSelector(state => state.auth);
  const { all_questions } = useSelector(state => state.QuestionReducer);

  const fetchAllposts = async () => {
    try {
      dispatch({ type: 'SET_LOADER' });
      const { data: { posts } } = await axios('http://localhost:5000/api/posts/allposts');
      dispatch({ type: 'CLOSE_LOADER' });
      dispatch({ type: 'SET_ALLPOSTS', payload: posts });
    } catch (error) {
      dispatch({ type: 'CLOSE_LOADER' });
    }
  }
  const  fetchAllQuestions = async () => {
    try {
        dispatch({type:'SET_LOADER'})
        const {data:{questions}} = await axios('http://localhost:5000/api/question/allquestions')
        dispatch({type:'CLOSE_LOADER'})
        dispatch({type:'SET_ALL_QUESTIONS',payload:questions})
    }
    catch(error){
        dispatch({type:'CLOSE_LOADER'})
    }
}
useEffect(()=>{
    fetchAllQuestions()
}
,[dispatch])

  useEffect(() => {

    fetchAllposts();
  }, [dispatch])







  return (
    <>
   
    <Helmet>
      <title>Home | Social Network</title>
    </Helmet>

      <div className="container">

        <Helmet>
          <title>Home Page | chatCluk</title>
        </Helmet>
        <div className="row">
          <div className="col-md-8">
            <h2 className='my-3 text-center'>POSTS</h2>
            {!loading ? allposts.map((post) => {
              return (
                <div className="card shadow my-3" key={post._id}>
                  <div className="card-header">
                    <div className="flex-row d-flex mt-3">
                      <Avatar name={post.author} size="50" round={true} color='green' />

                      <p className='p-3'>{post.author}</p>
                      <p className='p-3'>{moment(post.createdAt).format("MMM Do YY")}</p>


                    </div>
                    <h4 className='text-success'>{post.title}</h4>
                    <p>{post.body}</p>
                    <img src={post.imageUrl} alt="" style={{ height: "300px", width: "100%" }} />
                  </div>
                  <div className="card-body">
                    <p>{moment(post.createdAt).fromNow()}</p>

                    <p>{post.description}</p>

                    <Link className='btn btn-outline-success' to={`/details/${post._id}`}>View More <i className="fa-solid fa-eye"></i></Link>
                  </div>
                </div>
              )
            }) : <Loader />}
          </div>
          <div className="col-md-4">
            <h2 className='text-center my-3'>Questions</h2>
          {
                all_questions.map(question => {
                    return (
                        <div className="card my-2 shadow" key={question._id}>
                            <div className="card-header bg-success text-white">
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
                                         <Link className='btn btn-outline-success' to={`/question_details/${question._id}`}>Answer<i className="fa-solid fa-eye p-2"></i></Link>
                                         
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="row">
                                    <div className="d-flex">
                                        {/* <Link to={`/edit/${question._id}`} className='btn btn-success m-2'>
                                            <BsPencil className='icon' />
                                        </Link> */}
                                        {/* <Link to={'/AllQuestions'} className='btn btn-danger m-2'>
                                            <BsArchive className='icon' onClick={() => deleteQuestion(question._id)} />
                                        </Link> */}

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
    </>






  )
}

export default Home
