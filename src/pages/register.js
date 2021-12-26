import React, { useContext, useEffect,useState } from 'react'
import './register.css'
import Backdrop from '@mui/material/Backdrop';
import Alert from '@mui/material/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { logincall, registercall } from '../Apicalls'
import { Authcontext } from '../contextApi/Authcontext'
import { useHistory } from "react-router-dom";
function Register() {

   const [email,setemail ]=useState('')
   const [name,setname ]=useState('')
   const [password,setpassword ]=useState('')
   const {user,isFetching,error,usertoken, dispatch}=useContext(Authcontext)
   let history=useHistory()

const login=async()=>{
  await logincall({email,password},dispatch).then((res)=>{
    if(res==true){
        history.push('/home')
      
    }
  })
  
    
 
  
}


const register=async()=>{
 await registercall({email,password,name},dispatch).then((res)=>{
   if (res==true){
    
    loginshift()
   }
 })

}
console.log(user)
console.log(usertoken)

const loginshift=()=>{
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".container-register");
  
    sign_up_btn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
      });
}


const signupshift=()=>{
  const sign_in_btn = document.querySelector("#sign-in-btn");
  const container = document.querySelector(".container-register");
  
    sign_in_btn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
      });
}
useEffect(()=>{
  signupshift()
  loginshift()
},[])
 

    return (
      
        <div class="container-register">
        <div class="forms-container">
          <div class="signin-signup">
            <form  class="form-register sign-in-form">
              <h2 class="title">Sign in</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Email" value={email} onChange={(e)=>{setemail(e.target.value)}} />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
              </div>
              <button   class="btn-register" onClick={login} type="button"> Login</button>
              {/* <p class="social-text">Or Sign in with social platforms</p>
              <div class="social-media">
                <a href="#" class="social-icon">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-google"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div> */}
            </form>
            <form  class="form-register sign-up-form">
              <h2 class="title">Sign up</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Name" value={name} onChange={(e)=>{setname(e.target.value)}}/>
              </div>
              <div class="input-field">
                <i class="fas fa-envelope"></i>
                <input type="email" placeholder="Email" value={email}  onChange={(e)=>{setemail(e.target.value)}}/>
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
              </div>
              <button  class="btn-register"   onClick={register} type="button"> Sign up</button> 
              {/* <p class="social-text">Or Sign up with social platforms</p>
              <div class="social-media">
                <a href="#" class="social-icon">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-google"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div> */}
            </form>
          </div>
        </div>
  
        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                ex ratione. Aliquid!
              </p>
              <button class="btn-register transparent" id="sign-up-btn" onClick={signupshift}>
                Sign up
              </button>
            </div>
            <img src="img/log.svg" class="image" alt="" />
          </div>
          <div class="panel right-panel">
            <div class="content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button class="btn-register transparent" id="sign-in-btn"  onClick={loginshift}>
                Sign in
              </button>
            </div>
            <img src="img/register.svg" class="image" alt="" />
          </div>
          
        </div>
        <>
        {isFetching?
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>:null
      }
      {
        
        error==false ?
        <div style={{"position":"absolute","width":"100%","zIndex":"10000"}}>
          <Alert severity="success"  variant="filled" >You have Successfully Signed In .  Login Now</Alert>
          </div>
        :error!=null?
        <div style={{"position":"absolute","width":"100%","zIndex":"10000"}}>
        <Alert severity="error" variant="filled">Something Went Wrong</Alert>
        </div>
        :null
      }
      </>
      </div>
  
    )
}

export default Register
