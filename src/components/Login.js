import React ,{useState} from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    const config = {
      header: {
        'Content-Type': 'application/json'
      }
    }
    const body = {
      email,
      password
    }
    dispatch({type:'SET_LOADING'});
    try {
      const {data} = await axios.post('http://localhost:5000/api/users/login', body, config);
      dispatch({ type: 'CLOSE_LOADER' });
      localStorage.setItem('token', data.token);
      dispatch({ type: 'SET_TOKEN', payload: data.token });
  } catch (error) {
      dispatch({ type: 'CLOSE_LOADER' });
      dispatch({ type: 'LOGIN_ERRORS', payload: error.response.data.errors });
  }


  }
  return (
    <div className="container my-5 ">
    <div className="row">
        <div className="col-md-6 my-5">
            <h1>Wellcome to Our <br />Social Networking Site</h1>
            <Helmet>
                <title>Login | chatCluk</title>
            </Helmet>
            {/* <Toaster/> */}
        </div>
        <div className="col-md-6 my-5">
            <h1 >Login
              {/* login icon  */}
              <i className="fas fa-sign-in-alt p-2"></i>
               </h1>
            <form action="" onSubmit={handleSubmit} className='shadow p-5 my-5'>
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="password" onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Enter your password" />
                </div>
                <div className="form-group my-3">
                    <button className="btn btn-success">Login
                      {/* login icon  */}
                      <i className="fas fa-sign-in-alt p-2"></i>
                    </button>
                    <Link to='/register' className='p-2' >
                          Not a Member? Sign up
                    </Link>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default Login
