import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
// import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import PrivateRoute from './Private/PrivateRoute';
import RouteLinks from './Private/RouteLinks';
import CreatePost from './components/CreatePost';
import Home from './components/Home';
import Edit from './components/Edit';
import UpdateName from './components/UpdateName';
import UpdatePassword from './components/UpdatePassword';
import Details from './components/Details';
import Comment from './components/Comment';

import Account_details from './components/Account_details';
// import CreateProfile from './components/CreateProfile';
import AddQuestion from './components/AddQuestion';

import MyQuestions from './components/MyQuestions';
// import AllQuestions from './components/AllQuestions';
import QuestionDetails from './components/QuestionDetails';

// import RouteLinks from './Private/RouteLinks';
function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <RouteLinks exact path="/login" component={Login} />
        <RouteLinks path="/register" component={Register} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/create" exact component={CreatePost} />
        <PrivateRoute path="/edit/:id" exact component={Edit}/>
        <PrivateRoute path='/updateName' exact component={UpdateName}/>
        <PrivateRoute path='/updatePassword' exact component={UpdatePassword}/>
        <Route path='/' exact component={Home} />
        <PrivateRoute path="/details/:id" exact component={Details}/>
        <PrivateRoute path="/question_details/:id" exact component={QuestionDetails}/>

        <PrivateRoute path='/comment' exact component={Comment} />
        <PrivateRoute path='/Account_details/:id' exact component={Account_details} />
        {/* <PrivateRoute path='/createProfile/:id' exact component={CreateProfile} /> */}
        <PrivateRoute path='/AddQuestion' exact component={AddQuestion} />
        <PrivateRoute path='/MyQuestions' exact component={MyQuestions} />
        {/* <Route path='/AllQuestions' exact component={AllQuestions} /> */}


        

      </Switch>
    </Router>
  );
}

export default App;