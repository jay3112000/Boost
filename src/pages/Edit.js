import { Button, Card, Container, Divider, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import MiniDrawer from '../Components/Sidedrawer'
import './create.css'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { useParams } from 'react-router-dom'
import axios from "axios";

function Edit() {
    const  id  = useParams().id;
    const [resumedata,setresumedata]=useState([])
    const [name,setname]=useState('')
    const [email,setemail]=useState('')
    const [address,setaddress]=useState('')
    const [phone,setphone]=useState('')
    const [desc,setdesc]=useState('')
    const [profilepic,setprofilepic]=useState('')
    const [preview,setpreview]=useState(null)
    const [images,setimages]=useState([])
    const [pics,setpics]=useState([])
    const [education,seteducation]=useState([])
    const [workexp,setworkexp]=useState([])
    const [services,setservices]=useState([])
    
    const getresume=async()=>{
        try{
            const response=await axios.get(`https://boost-main.herokuapp.com/api/post/${id}`)
            console.log(response.data)
            setresumedata(response.data)
            setname(response.data.Name)
            setemail(response.data.Email)
            setaddress(response.data.Address)
            setphone(response.data.Phone)
            setdesc(response.data.Desc)
            setprofilepic(response.data.Profilepic)
            setimages(response.data.Images)
            seteducation(response.data.Education)
            setworkexp(response.data.Workexp)
            setservices(response.data.Services)


        }
        catch(error){
            console.log(error)
        }
    }


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

        const Editdata=async()=>{
      

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
                await axios.post("https://boost-main.herokuapp.com/api/upload", imagedata);
              } catch (err) {
                console.log(err)
              }
             
      
                const profileimg = new FormData();
                  const imgName = profilepic.name ;
                  profileimg.append("file", profilepic);
                  profileimg.append("name", 'profilepic');
                
        
                  try {
                    await axios.post("https://boost-main.herokuapp.com/api/upload/profilepic", profileimg);
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
              const response=await axios.put(`https://boost-main.herokuapp.com/api/post/${id}`, body)
              console.log(response.data)
          }catch(err){
             console.log(err)
          }
          }


    useEffect(()=>{
        getresume()
        },[])

    return (
        <div>
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
                      <img  className='profileimage' src={profilepic!=null?`https://boost-main.herokuapp.com/images/${profilepic}`:'https://cdn2.vectorstock.com/i/1000x1000/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg'}/>
                  </Container>
                  <div class="">
                <i class="fas fa-lock"></i>
                <input type="file" accept='.png, .jpeg, .jpg' onChange={e => {handleChangeImage(e)}} />
              </div>
                </div>
                <Box sx={{ flexGrow: 1 }}>

                <div >


                <form  class="sign-in-form">
                <Typography sx={{color:'#228B22' , fontSize:{xs:20,sm:30},fontFamily:'sans-serif'}}>
                     Personal Details
                 </Typography>
                 <Divider/>
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
                 </Typography>
                 {
                    education.map((curr,index)=>{
                        return(
                            <>
                            
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
                         
                          <TextField id="outlined-basic" label="Start-Year" variant="outlined" value={curr.Startdate} color="success" onChange={(e)=>{handeleducation('Startdate',e.target.value,index)}}/>
                          </Container>
                          <Container>
                          
                          <TextField id="outlined-basic" label="End-Year" variant="outlined" value={curr.Enddate}  color="success" onChange={(e)=>{handeleducation('Enddate',e.target.value,index)}}/>
                          </Container>
                         
                        </Box>
                           <Divider
                           sx={{color:"#228B22",height:1}}
                           />
                        
                            </>
                        );
                    })
                  }
                 <Button variant="contained" size="small" sx={{backgroundColor:"#228B22",marginLeft:70}} onClick={addedu}>
                  ADD
                </Button>

                <Typography sx={{color:'#228B22' , fontSize:{xs:20,sm:30},fontFamily:'sans-serif'}}>
                    Work Experince
                 </Typography>
                {
                    workexp.map((curr,index)=>{
                        return(
                            <>
                            
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
                         
                          <TextField id="outlined-basic" label="Start-Year" value={curr.Startdate} variant="outlined" color="success" onChange={(e)=>{handelworkexp('Startdate',e.target.value,index)}}/>
                          </Container>
                          <Container>
                          
                          <TextField id="outlined-basic" label="End-Year" value={curr.Enddate} variant="outlined" color="success" onChange={(e)=>{handelworkexp('Enddate',e.target.value,index)}}/>
                          </Container>
                         
                        </Box>
                           <Divider
                           sx={{color:"#228B22",height:1}}
                           />
                        
                            </>
                        );
                    })
                }
                 <Button variant="contained" size="small" sx={{backgroundColor:"#228B22",marginLeft:70}} onClick={addexp} >
                  ADD
                </Button>

                <Typography sx={{color:'#228B22' , fontSize:{xs:20,sm:30}}}>
                    Services (Any 3)
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
                 </Typography>
                <div class="">
                <i class="fas fa-lock"></i>
                <input type="file" accept='.png, .jpeg, .jpg'  onChange={e => {setimages(e.target.files)}} multiple/>
              </div>
               
              <button   class="btn"  type="button" onClick={Editdata} >Submit</button>
             
            </form>
           
                </div>
              </Box>

                </Box>
                </Container>
            </div>

            
        </div>
            
        </div>
    )
}

export default Edit
