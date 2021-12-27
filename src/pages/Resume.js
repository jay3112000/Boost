import { Container } from '@mui/material'
import React, { useContext, useEffect,useState } from 'react'
import MiniDrawer from '../Components/Sidedrawer'
import { useParams } from 'react-router-dom'
import axios from "axios";
import ExampleOne from '../Components/AnimatedText'
import emailjs from 'emailjs-com';
import { useForm } from "react-hook-form";
import Modal from 'react-bootstrap/Modal'

import './Resume.css'
import { ServiceList } from './ServiceList';
function Resume() {
    
    const  id  = useParams().id;
    const [resumedata,setresumedata]=useState([])
    const { register, handleSubmit,formState: { errors } ,reset} = useForm();
    const [successMessage, setSuccessMessage] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmit = data => console.log(data);
    const serviceID='service_ID';
    const templateID='template_ID';
    const userID='user_kgjbdRcWoIbNW2BtnINzl';

    const getresume=async()=>{
        try{
            const response=await axios.get(`https://boost-main.herokuapp.com/api/post/${id}`)
            console.log(response.data)
            setresumedata(response.data)
            document.documentElement.style.setProperty('--pcolor', response.data.Color);
        }
        catch(error){
            console.log(error)
        }
    }
   const onSubmitform = (data,r) => {
        sendEmail(
            serviceID,
            templateID,
            {
               name:data.name,
               phone:data.phone,
               email:data.email,
               subject:data.subject,
               description:data.description
            },
            userID
        )
       reset()
    }


    const sendEmail = (serviceID, templateID, variables, userID) => {
        emailjs.send(serviceID, templateID, variables, userID)
          .then(() => {
            handleShow();
          }).catch(err => setSuccessMessage(true));
      }


    useEffect(()=>{

    getresume()
    },[])
    return (
        <div>
            <MiniDrawer/>
            <Container disableGutters={true} maxWidth={false} sx={{
                  
                  paddingTop:{xs:'5rem',md:'3rem'},
                  paddingLeft:{xs:'0.5rem',sm:'5rem'},
                 
                  
             }}>


               {/* About Me Scection */}
                 <div id='about' className='container py-5 mt-5'>
            <div className='row'>
                <div className='col-lg-6 col-xm-12 '>
                    <div className='ibox'>
                    <img  src={`https://boost-main.herokuapp.com/images/${resumedata.Profilepic}`} alt='just wait' className="img-fluid  "/>
                    </div>
                 
                </div>
                <div className='col-lg-6 col-sm-12 my-2'>
                <ExampleOne  name={resumedata.Name} color={resumedata.Color}/>
                <h1 className="display-4">About me</h1>
                 <p>
                {resumedata.Desc}
                 </p>
                </div>
            
            </div>
            
        </div>
           {/* SERVICES SECTION */}
        <div className='services'>
            <h1 className='pt-3 mx-2'> SERVICES</h1>
                <div className='container '>
                    <div className='row '>
                      {
                        resumedata.Services!=null?
                       resumedata.Services.map((curr,index)=>{
                         return(
                          <div className='col-md-4 col-sm-12' key={index}>
                          <div className="card my-3">
                          <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/768px-React-icon.svg.png"
                              className="card-img-top"
                              alt="..."
                          />
                          <div className="card-body">
                            

                              <h5 className="card-title">{curr.Name}</h5>
                            
                              {
                                ServiceList.map((item)=>{
                                  if (item.name==curr.Name){
                                    return (
                                      <div>
                                      <p1 className="card-text">
                                       {item.desc}
                                      </p1>
                                      </div>
                                    )
                                  }
                                })
                              }
                             
                              <a href={curr.link} className="btn btn-primary">See Project</a>
                          </div>
                          </div>
                          </div>

                         )
                       }):null

                      }
                       
                    </div>

                </div> 
        </div>

        {/* EDUCATION SECTION */}

        <div id='education'  className="experience">
      <div className="d-flex justify-content-center my-5">
        <h1>education and experience</h1>
      </div>
      <div className="container experience-wrapper">
        {
          resumedata.Education!=null?
          resumedata.Education.map((curr,index)=>{
            return(
              <div    className={parseFloat(index)%2==0?"timeline-block timeline-block-right":"timeline-block timeline-block-left"} key={index}>
              <div className="marker"></div>
              <div className="timeline-content">
                <h3>{curr.Startdate}-{curr.Enddate}</h3>
                <p className="fw-bold">{curr.Name}
                </p>
                <p> {curr.Degree}
                </p>
              </div>
            </div>
            )
          }):null
        }
       
      </div>
    </div>
    {/* PORTFOLIO CAROUSEL */}
   <div id='portfolio'>

    <div className='caraousel-container mb-4'>

        <div className='container '>
            <div className="d-flex justify-content-center mt-5">
        <h1>PORTFOLIO</h1>
        
      </div>
      <p  className="d-flex justify-content-center">
            Examlples of my most Recent Work    
         </p>
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    { 
    resumedata.Images!=null?
      resumedata.Images.map((curr,index)=>{
        return(
          <div className="carousel-item active" key={index}>
     
          <img src={`https://boost-main.herokuapp.com/images/${curr}`} className="d-block w-100" alt="..."/>
          <div className="carousel-caption d-none d-md-block">
            <h5>TRAVEL GUIDE</h5>
            <p>A guide to all your favourite destinations</p>
          </div>
          
          
        </div>
        )
      }):null
    }
   
    
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
</div>
</div>
</div>
          {/* CONTACT ME SECTION           */}
          <div id='contacts'  className='contacts py-4 '>
            <div className='text-center mb-5'>
            <h1>Contact me</h1>
            </div>
            <div className='container'>
                <form onSubmit={handleSubmit(onSubmitform)}>

               
                <div className='row'>
                    <div className='col-md-6 col-xs-12'>
                      <input
                    
                      type='text'
                      className='form-control'
                      placeholder='Name'
                      name='name'
                      {...register("name", { required: true, maxLength: 20 })}
                      />
                    {errors.name&&<p>Please enter Name</p>}
                      <input
                     
                      type='email'
                      className='form-control'
                      placeholder='Email'
                      name='email'
                      {...register("email", { required: true, maxLength: 20 })}
                      />
                      {errors.email&&<p>Please enter Email Address</p>}
                      <input
                      
                      type='number'
                      className='form-control'
                      placeholder='Phone number'
                      name='phone'
                      {...register("phone", { required: true, maxLength: 20 })}
                      />
                       {errors.phone&&<p>Please enter Phone Number</p>}
                      <input
                     
                      type='text'
                      className='form-control'
                      placeholder='Subject'
                      name='subject'
                      {...register("subject", { required: true, maxLength: 40 })}
                      />
                       {errors.subject&&<p>Please enter Subject</p>}
                    </div>
                    <div className='col-md-6 col-xs-12'>
                        <textarea
                        
                        type='textarea'
                        className='form-control'
                        placeholder='Description'
                        name='description'
                        {...register("description", { required: true, maxLength: 80 })}
                        >
                        </textarea>
                        {errors.description&&<p>Please enter Description</p>}
                        <button  className="btn btn-primary">Send</button>
                         {
                             successMessage?<p className='error'>There seems to a problem!</p>:null
                         }
                        
                    </div>

                </div>
                </form>
            </div>
            
            <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Message Sent</Modal.Title>
        </Modal.Header>
        <Modal.Body>I will contact you as soon as possible!</Modal.Body>
        <Modal.Footer>
        <button  className="btn btn-primary" onClick={handleClose}>Close</button>
        </Modal.Footer>
      </Modal>
        </div>
        {/* FOOTER SECTION  */}
        <div className="myfooter mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="d-flex">
              <p>{resumedata.Address}</p>
            </div>
            <div className="d-flex">
              {resumedata.Phone}
            </div>
            <div className="d-flex">
              <p>{resumedata.Email}</p>
            </div>
          </div>
         
          <div className="col-lg-5 col-md-5 col-sm-6 align-items-center mt-2">
            <div className="d-flex justify-content-center">
             
            
            <a href="https://www.linkedin.com/in/jay-sharma-9b4758206/"><i className="bi bi-linkedin mx-2"></i></a>
            <a href="https://github.com/jay3112000"><i class="bi bi-github mx-2"></i></a>
             
            </div>
           
          </div>
        </div>
      </div>
    </div>
             </Container>
        </div>
        
    )
}

export default Resume
