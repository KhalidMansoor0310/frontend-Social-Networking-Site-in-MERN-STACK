

const initialState = {
    create_errors: [],
    loading: false,
    redirect: false,
    message: '',
    posts:[],
   allposts:[],
    deleteMsg: '',
   post:{},
   details:{},
   comments:[]
}

const postReducer = (state = initialState, action) => {
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
        case 'CREATE_POST_ERRORS':
            return {
                ...state,
                create_errors: action.payload
            }
        case 'REDIRECT_TRUE':
            return {
                ...state,
                redirect: true
            }
        case 'REDIRECT_FALSE':
            return {
                ...state,
                redirect: false
            }
        case 'SET_MESSAGE':
            return {
                ...state,
                message: action.payload
            }
        case 'REMOVE_MESSAGE':
            return {
                ...state,
                message: ''
            }
        case 'REMOVE_ERRORS':
            return {
                ...state,
                create_errors: []
            }
        case 'SET_POSTS':
            return {
                ...state,
                posts: action.payload,
            }
        case 'SET_ALLPOSTS':
            return {
                ...state,
                allposts: action.payload,
                loading: false,
                
            }
        case "SET_POST":
            return {
                ...state,
                post: action.payload,
                loading: false,
            }
        case "DELETE_POST":
            return {
                ...state,
                deleteMsg: action.payload,
                loading: false,
            }
        case "SET_DETAILS":
            return {
                ...state,
                details: action.payload,
                loading: false,
            }
        case "SET_COMMENTS":
            return {
                ...state,
                comments: action.payload,
                loading: false,
            }
        
        

            


            


        default:
            return state;
        }
}


export default postReducer;