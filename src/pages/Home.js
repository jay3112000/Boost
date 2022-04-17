import { Container } from '@mui/material'
import React, { useEffect, useState,useContext } from 'react'
import { getallposts } from '../Apicalls'
import CardList from '../Components/CardList'
import MiniDrawer from '../Components/Sidedrawer'
import { ResumeListcontext } from '../contextApi/ResumeList'
import { Link } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import Widget from 'rasa-webchat';
import Alert from '@mui/material/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
function Home() {
    const {ResumeLists,isFetching,error, dispatch}=useContext(ResumeListcontext)
    
  const  getposts=async()=>{

    getallposts(dispatch)

   }
  console.log(ResumeLists)
   
   useEffect(()=>{
       getposts()
       
   },[])
   if(isFetching){
      return(
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      )
   }
    return (
        <div>
           
            <MiniDrawer/>
          
            {
                ResumeLists!=null && ResumeLists.length !=0?
                <Container disableGutters={true} maxWidth={false} sx={{
                  
                     paddingTop:{xs:'5rem',md:'8rem'},
                     paddingLeft:{xs:'0.5rem',sm:'5rem'},
                    
                     
                }}>
                     
                     <CardList list={ResumeLists} />
                     
                        
                </Container>
           
           : <Container disableGutters={true} maxWidth={false} sx={{
                    paddingTop:{xs:'5rem',md:'8rem'},
                    paddingLeft:{xs:'0.5rem',sm:'5rem'},   
            }}>
            
            <h1 className='text-center'>
                You have no Resume yet
            </h1>
            
               
       </Container>
            }
        
        </div>
    )
}

export default Home
