import React ,{useState,useEffect}from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {toast,Toaster} from 'react-hot-toast'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
function AddQuestion() {
    const history = useHistory();
    const {redirect,question_error} = useSelector(state => state.QuestionReducer);
//    console.log(question_error)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const dispatch = useDispatch();
    const {user:{_id}} = useSelector(state=>state.auth)


   

    const handleQuestion = async(e) => {
        e.preventDefault();
        dispatch({type:'SET_LOADING'});
        const question = {
            title,
            description,
            author,
            _id,
            category
        
        }
        const config ={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        }
        try{
            const {data:{msg}}= await axios.post('http://localhost:5000/api/question/create_question', question, config);
            
           
            dispatch({type:'CLOSE_LOADING'});
            dispatch({type:'SET_MESSAGE', payload:msg});
            dispatch({type:'REDIRECT_TRUE'});
             setTitle('');
             setDescription('');
             setAuthor('');
        }
        catch(err){
            dispatch({type:'QUESTION_ERROR', payload:err.response.data.msg});
            dispatch({type:'CLOSE_LOADING'});
            dispatch({type:'REDIRECT_FALSE'});

        }
        
    }
    useEffect(() => {
        if (redirect) {
            history.push('/')
            dispatch({type:'MESSAGE_CLEAR'});
        
        }
       
    }, [redirect])



  return (
    <div className="container my-5">
        <Toaster/>
        <div className="row">
            <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Add a Question</h1>
                <p className="lead text-center">
                    Create a question and get help from other People
                </p>
                <form onSubmit={handleQuestion}>
                    <div className="form-group my-3">
                        <input type="text" className="form-control form-control-lg" 
                        placeholder="Question Title" 
                        onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group my-3">
                        <input type="text" className="form-control form-control-lg" 
                        placeholder="Question Author" 
                        onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                    <div className="form-group my-3">
                        <textarea className="form-control form-control-lg" 
                        placeholder="Write your question" 
                        rows="5"
                        onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group my-3">
                        <select className="form-control form-control-lg"  onChange={(e)=>setCategory(e.target.value)}>
                            <option value='0'>Select Category</option>
                            <option value='1'>Education</option>
                            <option value='2'>Politics</option>
                            <option value='3'>Sports</option>
                        </select>
                    </div>
                    <input type="submit" className="btn btn-success btn-block mt-4" />
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddQuestion
