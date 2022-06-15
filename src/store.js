import {createStore} from 'redux';
import { combineReducers } from 'redux';
import authReducer from './redux/authSlice';
import postReducer from './redux/postReducer';
import ProfileReducer from './redux/ProfileReducer';
import questionReducer from './redux/QuestionReducer';

const rootReducer = combineReducers({
    auth:authReducer,
    posts:postReducer,
    profile:ProfileReducer,
    QuestionReducer:questionReducer
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;