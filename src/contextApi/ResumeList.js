import { createContext, useReducer } from "react";
import ResumeListReducer from "../Reducers/ResumeListReducer";


const Init_state={
  ResumeLists:null,
  isFetching:false,
  error:null,
  
}

export const ResumeListcontext=createContext(Init_state)

export const ResumeListcontextprovider=({children})=>{
      const [state,dispatch]= useReducer(ResumeListReducer,Init_state)

      return(
         <ResumeListcontext.Provider
         value={{
             ResumeLists:state.ResumeLists,
             isFetching:state.isFetching,
             error:state.error,
             dispatch
         }}
         >
         {children}
         </ResumeListcontext.Provider>
      )
}