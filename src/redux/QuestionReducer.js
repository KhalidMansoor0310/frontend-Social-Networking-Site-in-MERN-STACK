const initialState = {
    my_questions: [],
    question: {},
    loading: false,
    question_error: [],
    redirect: false,
    questionMessage: '',
    all_questions: [],
    questionDetails:{},
    answers: [],

};
const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ANSWERS":
            return {
                ...state,
                answers: action.payload
            }
            
        case "SET_QUESTION_DETAILS":
            return {
                ...state,
                questionDetails: action.payload,
                loading: false,
            }
        case 'GET_QUESTIONS':
            return {
                ...state,
                my_questions: action.payload,
                loading: false,
                questionMessage: ''
            };
        case 'SET_ALL_QUESTIONS':
            return {
                ...state,
                all_questions: action.payload,
                loading: false,
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'CLOSE_LOADING':
            return {
                ...state,
                loading: false,
            };

        case 'GET_QUESTION':
            return {
                ...state,
                question: action.payload,
                loading: false,
            };
        case 'ADD_QUESTION':
            return {
                ...state,
                question: action.payload,
                loading: false,
                question_error: null,
                redirect: true,
                
        
            };
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
                    questionMessage: action.payload
                }

        case 'DELETE_QUESTION':
            return {
                ...state,
                deleteQues: action.payload,
                loading: false,
            };
        case 'QUESTION_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case 'QUESTION_LOADING':
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
}

export default questionReducer;