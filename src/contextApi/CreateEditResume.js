import { createContext, useReducer } from "react";
import CEResumereducer from "../Reducers/CEResumereducer";

const Init_state={
  Resume:{

  },
  error:null,
  uploading:false,
  uploaded:false,
  editing:false,
  edited:false
}

export const CEResumecontext=createContext(Init_state)

export const CEResumecontextprovider=({children})=>{
      const [state,dispatch]= useReducer(CEResumereducer,Init_state)

      return(
         <CEResumecontext.Provider
         value={{
             Resume:state.Resume,
             error:state.error,
             editing:state.editing,
             edited:state.edited,
             uploading:state.uploading,
             uploaded:state.uploaded,
             dispatch
         }}
         >
         {children}
         </CEResumecontext.Provider>
      )
}