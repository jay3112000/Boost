import { Button, Card, Container, Divider, Paper, TextField, Typography } from '@mui/material'
import { Box, padding } from '@mui/system'
import React, { useEffect, useState ,useContext} from 'react'
import MiniDrawer from '../Components/Sidedrawer'
import './create.css'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import Backdrop from '@mui/material/Backdrop';
import Alert from '@mui/material/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";
import { postResume } from '../Apicalls'
import { CEResumecontext } from '../contextApi/CreateEditResume'

function Create() {
  const [name,setname]=useState('')
  const [email,setemail]=useState('')
  const [address,setaddress]=useState('')
  const [phone,setphone]=useState('')
  const [desc,setdesc]=useState('')
  const [profilepic,setprofilepic]=useState('')
  const [preview,setpreview]=useState(null)
  const [color,setcolor]=useState('#1569a8')
  const [images,setimages]=useState([''])
  const { Resume,error,uploading,uploaded,editing,edited,dispatch}=useContext(CEResumecontext)
  const [pics,setpics]=useState([])
  const [education,seteducation]=useState([
    {
      
      Name:'',
      Degree:'',
      Startdate:'',
      Enddate:''
    },
    
  ])
  const [workexp,setworkexp]=useState([
    {
      Cname:'',
      Title:'',
      Startdate:'',
      Enddate:''
    }
  ])
  const [services,setservices]=useState([
    {
      Name:'',
      Link:''
    },
  ])

  const handleChangeImage = e => {
    setprofilepic(e.target.files[0])
    setpreview(URL.createObjectURL(e.target.files[0]))
      
    }
    
  const handeleducation=(vname,value,index)=>{
    let newArr = [...education];

    newArr[index][vname] = value;
    console.log(newArr) 
    seteducation(newArr)// copying the old datas array
    
  }
  const handelworkexp=(vname,value,index)=>{
    let newArr2 = [...workexp];

    newArr2[index][vname] = value;
    console.log(newArr2) 
    setworkexp(newArr2)// copying the old datas array
    
  }
  
  const handelservices=(vname,value,index)=>{
    let newArr3 = [...services];

    newArr3[index][vname] = value;
    console.log(newArr3) 
    setservices(newArr3)// copying the old datas array
    
  }
  

    const addedu=()=>{
        let list=[...education]
        list.push({
      
          Name:'',
          Degree:'',
          Startdate:null,
          Enddate:null
        },)
        seteducation(list)
    }
    const addexp=()=>{
      let list2=[...workexp]
      list2.push({
        Cname:'',
        Title:'',
        Startdate:'',
        Enddate:''
      },)
      setworkexp(list2)
    }
    const addservices=()=>{
      let list3=[...services]
      list3.push({
        Name:'',
        Link:''
      },)
      setservices(list3)
    }


    const createcall=async()=>{
         postResume({name,email,address,phone,desc,profilepic,color,images,education,workexp,services},dispatch)
    }
    const postdata=async()=>{
      

      const imagedata =new FormData();
      imagedata.append("name",'images')
     for(var x = 0; x<images.length; x++) {
       imagedata.append('files', images[x])
        }
        for(var x = 0; x<images.length; x++) {
          pics.push(images[x].name)
      }
console.log(pics)
        try {
          await axios.post("http://localhost:3000/api/upload", imagedata);
        } catch (err) {
          console.log(err)
        }
       

          const profileimg = new FormData();
            const imgName = profilepic.name ;
            profileimg.append("file", profilepic);
            profileimg.append("name", 'profilepic');
          
  
            try {
              await axios.post("http://localhost:3000/api/upload/profilepic", profileimg);
            } catch (err) {
              console.log(err)
            }

      const body={
        userId:"61b07e2c58aa2128f8fa5527",
        Name: name,
        Phone:phone,
        Address: address,
        Email: email,
        Profilepic:imgName,
        Desc:desc,
        Education:education,
        Workexp:workexp,
        Services: services,
        Images:pics
      };
      try{
        const response=await axios.post('http://localhost:3000/api/post', body)
        console.log(response.data)
    }catch(err){
       console.log(err)
    }
    }
    
   
   


    return (
        <div>
            <MiniDrawer/>
            <div className='upperbox'>
            
            <Container disableGutters={true} maxWidth={false} sx={{
                     paddingTop:{xs:'5rem',md:'8rem'},
                     paddingLeft:{xs:'0.5rem',sm:'5rem'}, 
                }}>
                <Box sx={{ display: 'flex' }}>
                <div>
                  <Container  disableGutters={true} maxWidth={false} sx={{
         maxHeight:'30rem',
                maxWidth: '30rem',
            overflow:'hidden',
      }}>
                      <img  className='profileimage' src={preview!=null?preview:'https://cdn2.vectorstock.com/i/1000x1000/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg'}/>
                  </Container>
                  <div class="mx-5">
                <i class="fas fa-lock"></i>
                <label for="file">Profile Picture</label>
                <input type="file" accept='.png, .jpeg, .jpg'  onChange={e => {handleChangeImage(e)}} />
              </div>
              <label className="color-selector mt-3 mx-5"> Select color theme
        <span className="circle" style={{ background: color }} />
        <span>{color}</span>
        <input
          type="color"
          value={color}
          onChange={(e)=>{setcolor(e.target.value)}}
          className="hidden"
         />
      </label>
                </div>
            
                <Box sx={{ flexGrow: 1 }}>

                <div >


                <form  class="form-register">
                <Typography sx={{color:'#228B22' , fontSize:{xs:20,sm:30},fontFamily:'sans-serif'}}>
                     Personal Details
                     <Divider/>
                 </Typography>
                 
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Your Name" value={name} onChange={(e)=>{setname(e.target.value)}}   />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="text" placeholder="Address" value={address} onChange={(e)=>{setaddress(e.target.value)}} />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="text" placeholder="Mobile Number" value={phone} onChange={(e)=>{setphone(e.target.value)}} />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="text" placeholder="Email-Id" value={email} onChange={(e)=>{setemail(e.target.value)}} />
              </div>
              <div class="text-field">
                <i class="fas fa-lock"></i>
                <textarea  placeholder="Something about yourself" rows='60' value={desc} onChange={(e)=>{setdesc(e.target.value)}}>

                </textarea>
              </div>
              <Typography sx={{color:'#228B22' , fontSize:{xs:20,sm:30},fontFamily:'sans-serif'}}>
                    Education
                    <Divider/>
                 </Typography>
                 {
                    education.map((curr,index)=>{
                        return(
                            < Paper
                            elevation={2}
                            sx={{padding:2,marginBottom:2}}
                            >
                            
                             <div class="input-field">
                                <i class="fas fa-lock"></i>
                                <input name='Name'  type="text" placeholder="Institute Name" value={curr.Name} onChange={(e)=>{handeleducation('Name',e.target.value,index)}}/>
                            </div>
                            <div class="input-field">
                                <i class="fas fa-lock"></i>
                                <input name='Degree' type="text" placeholder="Degree" value={curr.Degree} onChange={(e)=>{handeleducation('Degree',e.target.value,index)}} />
                            </div>
                            <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            p: 1,
                            m: 1,
                            bgcolor: 'background.paper',
                          }}
                        >
                          <Container>
                         
                          <TextField id="outlined-basic" label="Start-Year" variant="outlined" size="small" value={curr.Startdate} color="success" onChange={(e)=>{handeleducation('Startdate',e.target.value,index)}}/>
                          </Container>
                          <Container>
                          
                          <TextField id="outlined-basic" label="End-Year" variant="outlined" size="small" value={curr.Enddate}  color="success" onChange={(e)=>{handeleducation('Enddate',e.target.value,index)}}/>
                          </Container>
                         
                        </Box>
                           
                        
                            </Paper>
                        );
                    })
                  }
                 <Button variant="contained" size="small" sx={{backgroundColor:"#228B22",marginLeft:70}} onClick={addedu}>
                  ADD
                </Button>

                <Typography sx={{color:'#228B22' , fontSize:{xs:20,sm:30},fontFamily:'sans-serif'}}>
                    Work Experince
                    <Divider/>
                 </Typography>
                {
                    workexp.map((curr,index)=>{
                        return(
                            <Paper
                            elevation={2}
                            sx={{padding:2,marginBottom:2}}>
                            
                             <div class="input-field">
                                <i class="fas fa-lock"></i>
                                <input type="text" placeholder="Company Name" value={curr.Cname}  onChange={(e)=>{handelworkexp('Cname',e.target.value,index)}} />
                            </div>
                            <div class="input-field">
                                <i class="fas fa-lock"></i>
                                <input type="text" placeholder="Job Title" value={curr.Title} onChange={(e)=>{handelworkexp('Title',e.target.value,index)}} />
                            </div>
                            <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            p: 1,
                            m: 1,
                            bgcolor: 'background.paper',
                          }}
                        >
                          <Container>
                         
                          <TextField id="outlined-basic" label="Start-Year" value={curr.Startdate} size="small" variant="outlined" color="success" onChange={(e)=>{handelworkexp('Startdate',e.target.value,index)}}/>
                          </Container>
                          <Container>
                          
                          <TextField id="outlined-basic" label="End-Year" value={curr.Enddate} size="small" variant="outlined" color="success" onChange={(e)=>{handelworkexp('Enddate',e.target.value,index)}}/>
                          </Container>
                         
                        </Box>
                           {/* <Divider
                           sx={{color:"#228B22",height:1}}
                           /> */}
                        
                            </Paper>
                        );
                    })
                }
                 <Button variant="contained" size="small" sx={{backgroundColor:"#228B22",marginLeft:70}} onClick={addexp} >
                  ADD
                </Button>

                <Typography sx={{color:'#228B22' , fontSize:{xs:20,sm:30}}}>
                    Services (Any 3)
                    <Divider/>
                 </Typography>
                {
                    services.map((curr,index)=>{
                        return(
                            <>
                            
                             <div class="input-field">
                                <i class="fas fa-lock"></i>
                                <input type="text" placeholder="Service Name" value={curr.Name} onChange={(e)=>{handelservices('Name',e.target.value,index)}} />
                            </div>
                            <div class="input-field">
                                <i class="fas fa-lock"></i>
                                <input type="text" placeholder="Link to any project(Optional)" value={curr.Link} onChange={(e)=>{handelservices('Link',e.target.value,index)}}  />
                            </div>
                           
                           <Divider
                           sx={{color:"#228B22",height:1}}
                           />
                        
                            </>
                        );
                    })
                }
                 <Button variant="contained" size="small" sx={{backgroundColor:"#228B22",marginLeft:70}} onClick={addservices}>
                  ADD
                </Button>
                <Typography sx={{color:'#228B22' , fontSize:{xs:20,sm:30}}}>
                    Images of Your Recent Work
                    <Divider/>
                 </Typography>
                <div class="">
                <i class="fas fa-lock"></i>
                <input type="file" accept='.png, .jpeg, .jpg' onChange={e => {setimages(e.target.files)}} multiple/>
                {/* <span class='button'>Choose</span>
                <span class='label' data-js-label>No file selected</span> */}
              </div>
               
              <button   class="btn-register mt-4"  type="button" onClick={createcall} >Submit</button>
             
            </form>
           
                </div>
              </Box>

                </Box>
                {
        
        uploaded==true ?
        <div style={{"position":"relative","width":"100%","zIndex":"10000"}}>
          <Alert severity="success"  variant="filled" >Posted Successfully</Alert>
          </div>
        :error!=null?
        <div style={{"position":"relative","width":"100%","zIndex":"10000"}}>
        <Alert severity="error" variant="filled">Something Went Wrong</Alert>
        </div>
        :null
      }
                </Container>
                {uploading?
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>:null
      }
            </div>
           
            
        </div>
    )
}

export default Create
