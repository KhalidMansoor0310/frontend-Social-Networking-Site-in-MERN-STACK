const initialState={
    updateErrors:[],
    profile:{}

}

const ProfileReducer=(state=initialState,action)=>{
    switch(action.type){
        
        case 'SET_PROFILE_ERRORS':
            return{
                ...state,
                updateErrors:action.payload,
     
            }
        case 'PROFILE_ERRORS_RESET':
            return{
                ...state,
                updateErrors:[]
            }
        case 'SET_PROFILE':
            return{
                ...state,
                profile:action.payload
            }
            
        default:
            return state;

}}

export default ProfileReducer;