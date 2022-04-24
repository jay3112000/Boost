import axios from "axios";
import { FETCH_FAILURE, FETCH_POSTS, FETCH_SUCCESS, LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_START, REGISTER_SUCCESS,POST_START ,POST_SUCCESS,POST_FAILURE} from "./Actions/Actions";


export const logincall=async(credentials,dispatch)=>{
    dispatch({type:LOGIN_START})
    try{
        const response=await axios.post('https://boost-main.herokuapp.com/api/user/login', credentials)
        dispatch({type : LOGIN_SUCCESS,payload:response.data})
        localStorage.setItem('token',response.data);
        return true
    }catch(err){
        dispatch({type:LOGIN_FAILURE,payload:err})
        return false
    }

}

export const registercall=async(credentials,dispatch)=>{
    dispatch({type:REGISTER_START})
    try{
        const response=await axios.post('https://boost-main.herokuapp.com/api/user/register', credentials)
        dispatch({type : REGISTER_SUCCESS,payload:response.data})
        localStorage.setItem('userid',response.data._id)
        return true
    }catch(err){
        dispatch({type:REGISTER_FAILURE,payload:err})
        return false
    }

}

export const getallposts=async(dispatch)=>{
        dispatch({type:FETCH_POSTS})
    try{
        const userid=localStorage.getItem('userid')
        const response=await axios.get(`https://boost-main.herokuapp.com/api/post/myposts/all/${userid}`)
        console.log(response.data)
        dispatch({type:FETCH_SUCCESS,payload:response.data})
    }
    catch(error){
        dispatch({type:FETCH_FAILURE,payload:error})
    }
}


export const postResume=async({name,email,address,phone,role,noProjects,yrExp,linkedIn, personelQ ,desc,profilepic,color,images,education,workexp,services,activities,rewards,certifications,skills},dispatch)=>{
  console.log(personelQ);
    dispatch({type:POST_START})
    let pics=[]
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
    const userid=localStorage.getItem('userid')
    const body={
      userId: userid,
      Name: name,
      Phone:phone,
      Address: address,
      Email: email,
      LinkId:linkedIn,
      Role:role,
      NoProjects:noProjects,
      YrExp:yrExp,
      Profilepic:imgName,
      Desc:desc,
      Education:education,
      Workexp:workexp,
      Activities:activities,
      Certificates:certifications,
      Rewards:rewards,
      Skills:skills,
      Services: services,
      PersonalQ: personelQ,
      Images:pics,
      Color:color
    };
    try{
      const response=await axios.post('https://boost-main.herokuapp.com/api/post', body)
      console.log(response.data)
      dispatch({type:POST_SUCCESS,payload:response.data})
      return true
  }catch(err){
     console.log(err)
     dispatch({type:POST_FAILURE,payload:err})
     return false
  }
  }
  