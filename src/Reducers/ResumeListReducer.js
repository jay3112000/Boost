import { FETCH_FAILURE, FETCH_POSTS, FETCH_SUCCESS  } from "../Actions/Actions"


const ResumeListReducer=(state,action)=>{
    switch(action.type){
        case FETCH_POSTS:
            return{
                ResumeLists:null,
                isFetching:true,
                error:null,
                
            }
        case FETCH_SUCCESS:
            return{
                ResumeLists:action.payload,
                isFetching:false,
                error:false,
                
            }
         case FETCH_FAILURE:
             return{
                 ResumeLists:null,
                 isFetching:false,
                 error:action.payload,
             }
          
         
        
         default:
             return state
    }
 }
 export default ResumeListReducer