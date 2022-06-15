import jwt_decode from 'jwt-decode'
const initialState = {
    loading: false,
    registerErrors: [],
    loginErrors: [],
    token: "",
    user: '',
}
const verifyToken = (token) => {
    const decodedToken = jwt_decode(token);
    const expiresIn = new Date(decodedToken.exp * 1000);
    if (Date.now() > expiresIn) {
        localStorage.removeItem('token');
    }
    else {
        return decodedToken;
    }
}
const token = localStorage.getItem('token');
if (token) {
    const decoded = verifyToken(token);
    initialState.token = token;
    const { user } = decoded;
    initialState.user = user;
}
console.log(initialState)
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOADER':
            return {
                ...state,
                loading: true
            }
        case 'CLOSE_LOADER':
            return {
                ...state,
                loading: false
            }
        case 'REGISTER_ERRORS':
            return {
                ...state,
                registerErrors: action.payload
            }
        case "SET_TOKEN":
            const decoded = verifyToken(action.payload);
            console.log(decoded)
            const { user } = decoded;
            // console.log(user)
            return {
                ...state,
                token: action.payload,
                user: user,
                loginErrors: [],
                registerErrors: []
            }
        case "LOGIN_ERRORS":
            return {
                ...state,
                loginErrors: action.payload
            }
        case "LOGOUT":
            localStorage.removeItem('token');
            return {
                ...state,
                token: "",
                user: '',
                loginErrors: [],
                registerErrors: []
            }
            

        default:
            return state;
    }
}

export default authReducer
