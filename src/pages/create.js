import {
  Button,
  Card,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box, padding } from "@mui/system";
import React, { useEffect, useState, useContext } from "react";
import MiniDrawer from "../Components/Sidedrawer";
import "./create.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { postResume } from "../Apicalls";
import { CEResumecontext } from "../contextApi/CreateEditResume";

function Create() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [desc, setdesc] = useState("");
  const [linkedIn, setlinkedIn] = useState("");
  const [yrExp, setyrExp] = useState("");
  const [role, setrole] = useState("");
  const [noProjects, setnoProjects] = useState("");
  const [profilepic, setprofilepic] = useState("");
  const [preview, setpreview] = useState(null);
  const [color, setcolor] = useState("#1569a8");
  const [images, setimages] = useState([""]);
  const { Resume, error, uploading, uploaded, editing, edited, dispatch } =
    useContext(CEResumecontext);
  const [pics, setpics] = useState([]);
  const [personelQ, setpersonalQ] = useState(
    {
      Job: "",
      Strength: "",
      Weakness: "",
      Expectations: "",
      Future: "",
      Pjob: "",
      Pressure:"",
      About: "",
      Others: "",
      Achievement: "",
    },
  );
  const [education, seteducation] = useState([
    {
      Name: "",
      Degree: "",
      Cgpa: "",
      Board: "",
      Major: "",
      Startdate: "",
      Enddate: "",
    },
  ]);
  const [workexp, setworkexp] = useState([
    {
      Cname: "",
      Title: "",
      Description: "",
      Startdate: "",
      Enddate: "",
    },
  ]);
  const [activities, setactivities] = useState([
    {
      Name: "",
      Description: "",
    },
  ]);
  const [certifications, setcertifications] = useState([
    {
      Name: "",
      Year: "",
    },
  ]);
  const [rewards, setrewards] = useState([
    {
      Name: "",
      Year: "",
    },
  ]);
  const [skills, setskills] = useState([
    {
      Name: "",
      Level: "",
    },
  ]);
  const [services, setservices] = useState([
    {
      Name: "",
      Link: "",
    },
  ]);

  const handleChangeImage = (e) => {
    setprofilepic(e.target.files[0]);
    setpreview(URL.createObjectURL(e.target.files[0]));
  };
  
  const handelPersonalJob = ( value) => {
    
    setpersonalQ({...personelQ,Job:value}); // copying the old datas array
    console.log(personelQ)
  };
  const handelPersonalStrength= ( value) => {
    
    setpersonalQ({...personelQ,Strength:value}); // copying the old datas array
    console.log(personelQ)
  };
  const handelPersonalWeak = ( value) => {
    
    setpersonalQ({...personelQ,Weakness:value}); // copying the old datas array
    console.log(personelQ)
  };
  const handelPersonalExp = ( value) => {
    
    setpersonalQ({...personelQ,Expectations:value}); // copying the old datas array
    console.log(personelQ)
  };
  const handelPersonalFuture = ( value) => {
    
    setpersonalQ({...personelQ,Future:value}); // copying the old datas array
    console.log(personelQ)
  };
  const handelPersonalPJob = ( value) => {
    
    setpersonalQ({...personelQ,Pjob:value}); // copying the old datas array
    console.log(personelQ)
  };
  const handelPersonalPressure = ( value) => {
    
    setpersonalQ({...personelQ,Pressure:value}); // copying the old datas array
    console.log(personelQ)
  };
  const handelPersonalAbout = ( value) => {
    
    setpersonalQ({...personelQ,About:value}); // copying the old datas array
    console.log(personelQ)
  };
  const handelPersonalOthers = ( value) => {
    
    setpersonalQ({...personelQ,Others:value}); // copying the old datas array
    console.log(personelQ)
  };
  const handelPersonalAcheive = ( value) => {
    
    setpersonalQ({...personelQ,Achievement:value}); // copying the old datas array
    console.log(personelQ)
  };

  const handeleducation = (vname, value, index) => {
    let newArr = [...education];

    newArr[index][vname] = value;
    console.log(newArr);
    seteducation(newArr); // copying the old datas array
  };
  const handelworkexp = (vname, value, index) => {
    let newArr2 = [...workexp];

    newArr2[index][vname] = value;
    console.log(newArr2);
    setworkexp(newArr2); // copying the old datas array
  };
  const handelrewards = (vname, value, index) => {
    let newArr2 = [...rewards];

    newArr2[index][vname] = value;
    console.log(newArr2);
    setrewards(newArr2); // copying the old datas array
  };
  const handelcert = (vname, value, index) => {
    let newArr2 = [...certifications];

    newArr2[index][vname] = value;
    console.log(newArr2);
    setcertifications(newArr2); // copying the old datas array
  };
  const handelskills = (vname, value, index) => {
    let newArr2 = [...skills];

    newArr2[index][vname] = value;
    console.log(newArr2);
    setskills(newArr2); // copying the old datas array
  };
  const handelactivities = (vname, value, index) => {
    let newArr2 = [...activities];

    newArr2[index][vname] = value;
    console.log(newArr2);
    setactivities(newArr2); // copying the old datas array
  };

  const handelservices = (vname, value, index) => {
    let newArr3 = [...services];

    newArr3[index][vname] = value;
    console.log(newArr3);
    setservices(newArr3); // copying the old datas array
  };
  const addedu = () => {
    let list = [...education];
    list.push({
      Name: "",
      Degree: "",
      Cgpa: "",
      Board: "",
      Major: "",
      Startdate: null,
      Enddate: null,
    });
    seteducation(list);
  };
  const addexp = () => {
    let list2 = [...workexp];
    list2.push({
      Cname: "",
      Title: "",
      Description: "",
      Startdate: "",
      Enddate: "",
    });
    setworkexp(list2);
  };
  const addactivity = () => {
    let list2 = [...workexp];
    list2.push({
      Name: "",
      Description: "",
    });
    setactivities(list2);
  };
  const addrewards = () => {
    let list2 = [...rewards];
    list2.push({
      Name: "",
      Year: "",
    });
    setrewards(list2);
  };

  const addcertificate = () => {
    let list2 = [...certifications];
    list2.push({
      Name: "",
      Year: "",
    });
    setcertifications(list2);
  };
  const addskills = () => {
    let list2 = [...skills];
    list2.push({
      Name: "",
      Level: "",
    });
    setskills(list2);
  };
  const addservices = () => {
    let list3 = [...services];
    list3.push({
      Name: "",
      Link: "",
    });
    setservices(list3);
  };

  const createcall = async () => {
    postResume(
      {
        name,
        email,
        address,
        phone,
        role,
        noProjects,
        yrExp,
       linkedIn,
       personelQ,
        desc,
        profilepic,
        color,
        images,
        education,
        workexp,
        services,
        activities,
        rewards,
        certifications,
        skills
        
      },
      dispatch
    );
  };
  return (
    <div>
      <MiniDrawer />
      <div className="upperbox">
        <Container
          disableGutters={true}
          maxWidth={false}
          sx={{
            paddingTop: { xs: "5rem", md: "8rem" },
            paddingLeft: { xs: "0.5rem", sm: "5rem" },
          }}
        >
          <Box sx={{ display: "flex" }}>
            <div className="profileWrapper">
              <Container
                disableGutters={true}
                maxWidth={false}
                sx={{
                  maxHeight: "30rem",
                  maxWidth: "30rem",
                  overflow: "hidden",
                }}
              >
                <img
                  className="profileimage"
                  src={
                    preview != null
                      ? preview
                      : "https://cdn2.vectorstock.com/i/1000x1000/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg"
                  }
                />
              </Container>
              <div class="mx-5">
                <i class="fas fa-lock"></i>
                <label for="file">Profile Picture</label>
                <input
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  onChange={(e) => {
                    handleChangeImage(e);
                  }}
                />
              </div>
              <label className="color-selector mt-3 mx-5">
                {" "}
                Select color theme
                <span className="circle" style={{ background: color }} />
                <span>{color}</span>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => {
                    setcolor(e.target.value);
                  }}
                  className="hidden"
                />
              </label>
            </div>

            <Box sx={{ flexGrow: 1 }}>
              <div className="formWrapper">
                <form class="form-register">
                  <div className="scrollsnap">
                    <div className="section">
                      <Typography
                        sx={{
                          color: "#228B22",
                          fontSize: { xs: 20, sm: 30 },
                          fontFamily: "sans-serif",
                        }}
                      >
                        Personal Details
                        <Divider />
                      </Typography>

                      <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => {
                            setname(e.target.value);
                          }}
                        />
                      </div>
                      <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input
                          type="text"
                          placeholder="Address"
                          value={address}
                          onChange={(e) => {
                            setaddress(e.target.value);
                          }}
                        />
                      </div>
                      <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input
                          type="text"
                          placeholder="Mobile Number"
                          value={phone}
                          onChange={(e) => {
                            setphone(e.target.value);
                          }}
                        />
                      </div>
                      <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input
                          type="text"
                          placeholder="Email-Id"
                          value={email}
                          onChange={(e) => {
                            setemail(e.target.value);
                          }}
                        />
                      </div>
                      <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input
                          type="text"
                          placeholder="Role eg.Frontend Developer"
                          value={role}
                          onChange={(e) => {
                            setrole(e.target.value);
                          }}
                        />
                      </div>
                      <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input
                          type="text"
                          placeholder="No. of Completed projects"
                          value={noProjects}
                          onChange={(e) => {
                            setnoProjects(e.target.value);
                          }}
                        />
                      </div>
                      <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input
                          type="text"
                          placeholder="Years of Experience"
                          value={yrExp}
                          onChange={(e) => {
                            setyrExp(e.target.value);
                          }}
                        />
                      </div>
                      <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input
                          type="text"
                          placeholder="LinkedIn Profile"
                          value={linkedIn}
                          onChange={(e) => {
                            setlinkedIn(e.target.value);
                          }}
                        />
                      </div>
                      <div class="text-field">
                        <i class="fas fa-lock"></i>
                        <textarea
                          placeholder="Something about yourself"
                          rows="60"
                          value={desc}
                          onChange={(e) => {
                            setdesc(e.target.value);
                          }}
                        ></textarea>
                      </div>
                    </div>
                    <div className="section">
                      <Typography
                        sx={{
                          color: "#228B22",
                          fontSize: { xs: 20, sm: 30 },
                          fontFamily: "sans-serif",
                        }}
                      >
                        Education
                        <Divider />
                      </Typography>
                      <div className="addWrapper">
                        {education.map((curr, index) => {
                          return (
                            <Paper
                              elevation={2}
                              sx={{ padding: 2, marginBottom: 2 }}
                            >
                              <div class="input-field">
                                <i class="fas fa-lock"></i>
                                <input
                                  name="Name"
                                  type="text"
                                  placeholder="Institute Name"
                                  value={curr.Name}
                                  onChange={(e) => {
                                    handeleducation(
                                      "Name",
                                      e.target.value,
                                      index
                                    );
                                  }}
                                />
                              </div>
                              <div class="input-field">
                                <i class="fas fa-lock"></i>
                                <input
                                  name="Degree"
                                  type="text"
                                  placeholder="Degree"
                                  value={curr.Degree}
                                  onChange={(e) => {
                                    handeleducation(
                                      "Degree",
                                      e.target.value,
                                      index
                                    );
                                  }}
                                />
                              </div>
                              <div class="input-field">
                                <i class="fas fa-lock"></i>
                                <input
                                  name="Degree"
                                  type="text"
                                  placeholder="Cgpa"
                                  value={curr.Cgpa}
                                  onChange={(e) => {
                                    handeleducation(
                                      "Cgpa",
                                      e.target.value,
                                      index
                                    );
                                  }}
                                />
                              </div>
                              <div class="input-field">
                                <i class="fas fa-lock"></i>
                                <input
                                  name="Degree"
                                  type="text"
                                  placeholder="Board"
                                  value={curr.Board}
                                  onChange={(e) => {
                                    handeleducation(
                                      "Board",
                                      e.target.value,
                                      index
                                    );
                                  }}
                                />
                              </div>
                              <div class="input-field">
                                <i class="fas fa-lock"></i>
                                <input
                                  name="Degree"
                                  type="text"
                                  placeholder="Major"
                                  value={curr.Major}
                                  onChange={(e) => {
                                    handeleducation(
                                      "Major",
                                      e.target.value,
                                      index
                                    );
                                  }}
                                />
                              </div>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  p: 1,
                                  m: 1,
                                  bgcolor: "background.paper",
                                }}
                              >
                                <Container>
                                  <TextField
                                    id="outlined-basic"
                                    label="Start-Year"
                                    variant="outlined"
                                    size="small"
                                    value={curr.Startdate}
                                    color="success"
                                    onChange={(e) => {
                                      handeleducation(
                                        "Startdate",
                                        e.target.value,
                                        index
                                      );
                                    }}
                                  />
                                </Container>
                                <Container>
                                  <TextField
                                    id="outlined-basic"
                                    label="End-Year"
                                    variant="outlined"
                                    size="small"
                                    value={curr.Enddate}
                                    color="success"
                                    onChange={(e) => {
                                      handeleducation(
                                        "Enddate",
                                        e.target.value,
                                        index
                                      );
                                    }}
                                  />
                                </Container>
                              </Box>
                            </Paper>
                          );
                        })}
                      </div>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: "#228B22" }}
                        onClick={addedu}
                      >
                        ADD
                      </Button>
                    </div>

                    <div className="section">
                      <Typography
                        sx={{
                          color: "#228B22",
                          fontSize: { xs: 20, sm: 30 },
                          fontFamily: "sans-serif",
                        }}
                      >
                        Work Experince
                        <Divider />
                      </Typography>
                      {workexp.map((curr, index) => {
                        return (
                          <Paper
                            elevation={2}
                            sx={{ padding: 2, marginBottom: 2 }}
                          >
                            <div class="input-field">
                              <i class="fas fa-lock"></i>
                              <input
                                type="text"
                                placeholder="Company Name"
                                value={curr.Cname}
                                onChange={(e) => {
                                  handelworkexp("Cname", e.target.value, index);
                                }}
                              />
                            </div>
                            <div class="input-field">
                              <i class="fas fa-lock"></i>
                              <input
                                type="text"
                                placeholder="Job Title"
                                value={curr.Title}
                                onChange={(e) => {
                                  handelworkexp("Title", e.target.value, index);
                                }}
                              />
                            </div>
                            <div class="text-field">
                              <i class="fas fa-lock"></i>
                              <textarea
                                placeholder="Description about the job"
                                rows="60"
                                value={curr.Description}
                                onChange={(e) => {
                                  handelworkexp(
                                    "Description",
                                    e.target.value,
                                    index
                                  );
                                }}
                              ></textarea>
                            </div>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                p: 1,
                                m: 1,
                                bgcolor: "background.paper",
                              }}
                            >
                              <Container>
                                <TextField
                                  id="outlined-basic"
                                  label="Start-Year"
                                  value={curr.Startdate}
                                  size="small"
                                  variant="outlined"
                                  color="success"
                                  onChange={(e) => {
                                    handelworkexp(
                                      "Startdate",
                                      e.target.value,
                                      index
                                    );
                                  }}
                                />
                              </Container>
                              <Container>
                                <TextField
                                  id="outlined-basic"
                                  label="End-Year"
                                  value={curr.Enddate}
                                  size="small"
                                  variant="outlined"
                                  color="success"
                                  onChange={(e) => {
                                    handelworkexp(
                                      "Enddate",
                                      e.target.value,
                                      index
                                    );
                                  }}
                                />
                              </Container>
                            </Box>
                            {/* <Divider
                           sx={{color:"#228B22",height:1}}
                           /> */}
                          </Paper>
                        );
                      })}
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: "#228B22" }}
                        onClick={addexp}
                      >
                        ADD
                      </Button>
                    </div>

                    <div className="section">
                      <Typography
                        sx={{
                          color: "#228B22",
                          fontSize: { xs: 20, sm: 30 },
                          fontFamily: "sans-serif",
                        }}
                      >
                        Skills
                        <Divider />
                      </Typography>
                      {skills.map((curr, index) => {
                        return (
                          <Paper
                            className="paperClass"
                            elevation={2}
                            sx={{ padding: 2, marginBottom: 2 }}
                          >
                            <div class="input-field">
                              <i class="fas fa-lock"></i>
                              <input
                                type="text"
                                placeholder="Name"
                                value={curr.Name}
                                onChange={(e) => {
                                  handelskills("Name", e.target.value, index);
                                }}
                              />
                            </div>
                            <div class="input-field">
                              <i class="fas fa-lock"></i>
                              <input
                                type="text"
                                placeholder="Beginner , Intermediate , Expert"
                                value={curr.Level}
                                onChange={(e) => {
                                  handelskills("Level", e.target.value, index);
                                }}
                              />
                            </div>
                          </Paper>
                        );
                      })}
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: "#228B22" }}
                        onClick={addskills}
                      >
                        ADD
                      </Button>
                    </div>

                    <div className="section">
                      <Typography
                        sx={{
                          color: "#228B22",
                          fontSize: { xs: 20, sm: 30 },
                          fontFamily: "sans-serif",
                        }}
                      >
                        Certifications
                        <Divider />
                      </Typography>
                      {certifications.map((curr, index) => {
                        return (
                          <Paper
                            className="paperClass"
                            elevation={2}
                            sx={{ padding: 2, marginBottom: 2 }}
                          >
                            <div class="input-field">
                              <i class="fas fa-lock"></i>
                              <input
                                type="text"
                                placeholder="Name"
                                value={curr.Name}
                                onChange={(e) => {
                                  handelcert("Name", e.target.value, index);
                                }}
                              />
                            </div>
                            <div class="input-field">
                              <i class="fas fa-lock"></i>
                              <input
                                type="text"
                                placeholder="Year"
                                value={curr.Year}
                                onChange={(e) => {
                                  handelcert("Year", e.target.value, index);
                                }}
                              />
                            </div>
                          </Paper>
                        );
                      })}
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: "#228B22" }}
                        onClick={addcertificate}
                      >
                        ADD
                      </Button>
                    </div>

                    <div className="section">
                      <Typography
                        sx={{
                          color: "#228B22",
                          fontSize: { xs: 20, sm: 30 },
                          fontFamily: "sans-serif",
                        }}
                      >
                        Achievements
                        <Divider />
                      </Typography>
                      {rewards.map((curr, index) => {
                        return (
                          <Paper
                            className="paperClass"
                            elevation={2}
                            sx={{ padding: 2, marginBottom: 2 }}
                          >
                            <div class="input-field">
                              <i class="fas fa-lock"></i>
                              <input
                                type="text"
                                placeholder="Name"
                                value={curr.Name}
                                onChange={(e) => {
                                  handelrewards("Name", e.target.value, index);
                                }}
                              />
                            </div>
                            <div class="input-field">
                              <i class="fas fa-lock"></i>
                              <input
                                type="text"
                                placeholder="Year"
                                value={curr.Year}
                                onChange={(e) => {
                                  handelrewards("Year", e.target.value, index);
                                }}
                              />
                            </div>
                          </Paper>
                        );
                      })}
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: "#228B22" }}
                        onClick={addrewards}
                      >
                        ADD
                      </Button>
                    </div>

                    <div className="section">
                      <Typography
                        sx={{ color: "#228B22", fontSize: { xs: 20, sm: 30 } }}
                      >
                        Services
                        <Divider />
                      </Typography>
                      {services.map((curr, index) => {
                        return (
                          <>
                            <div class="input-field">
                              <i class="fas fa-lock"></i>
                              <input
                                type="text"
                                placeholder="Service Name"
                                value={curr.Name}
                                onChange={(e) => {
                                  handelservices("Name", e.target.value, index);
                                }}
                              />
                            </div>
                            <div class="input-field">
                              <i class="fas fa-lock"></i>
                              <input
                                type="text"
                                placeholder="Link to any project(Optional)"
                                value={curr.Link}
                                onChange={(e) => {
                                  handelservices("Link", e.target.value, index);
                                }}
                              />
                            </div>

                            <Divider sx={{ color: "#228B22", height: 1 }} />
                          </>
                        );
                      })}
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: "#228B22" }}
                        onClick={addservices}
                      >
                        ADD
                      </Button>
                    </div>
                    <div className="section">
                      <Typography
                        sx={{
                          color: "#228B22",
                          fontSize: { xs: 20, sm: 30 },
                          fontFamily: "sans-serif",
                        }}
                      >
                        Personal Questions
                        <Divider />
                      </Typography>
                     
                      <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input
                          type="text"
                          placeholder="Why Do You Want This Job?"
                          value={personelQ.Job}
                          onChange={(e) => {
                            handelPersonalJob(
                  
                              e.target.value,
                            );
                          }}
                        />
                      </div>
                      <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input
                          type="text"
                          placeholder="What Is Your Greatest Strength?"
                          value={personelQ.Strength}
                          onChange={(e) => {
                           handelPersonalStrength(
                              
                              e.target.value,
                            );
                          }}
                        />
                      </div>
                      <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input
                          type="text"
                          placeholder="What Is Your Greatest Weakness?"
                          value={personelQ.Weakness}
                          onChange={(e) => {
                            handelPersonalWeak(
                              
                              e.target.value,
                            );
                          }}
                        />
                      </div>
                      <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input
                          type="text"
                          placeholder="What Are Your Salary Expectations?"
                          value={personelQ.Expectations}
                          onChange={(e) => {
                            handelPersonalExp(
                              
                              e.target.value,
                            );
                          }}
                        />
                      </div>
                      <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input
                          type="text"
                          placeholder="What Are Goals for the Future?"
                          value={personelQ.Future}
                          onChange={(e) => {
                            handelPersonalFuture(
                              
                              e.target.value,
                            );
                          }}
                        />
                      </div>
                      <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input
                          type="text"
                          placeholder="What did you like about your previous job?"
                          value={personelQ.Pjob}
                          onChange={(e) => {
                            handelPersonalPJob(
                              
                              e.target.value,
                            );
                          }}
                        />
                      </div>
                      <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input
                          type="text"
                          placeholder="How do you handle stress and pressure?"
                          value={personelQ.Pressure}
                          onChange={(e) => {
                            handelPersonalPressure(
                              
                              e.target.value,
                            );
                          }}
                        />
                      </div>
                      <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input
                          type="text"
                          placeholder="What are you passionate about?"
                          value={personelQ.About}
                          onChange={(e) => {
                            handelPersonalAbout(
                              
                              e.target.value,
                            );
                          }}
                        />
                      </div>
                      <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input
                          type="text"
                          placeholder="How well do you work with others?"
                          value={personelQ.Others}
                          onChange={(e) => {
                            handelPersonalOthers(
                              
                              e.target.value,
                            );
                          }}
                        />
                      </div>
                      <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input
                          type="text"
                          placeholder="What is your biggest professional achievement?"
                          value={personelQ.Achievement}
                          onChange={(e) => {
                            handelPersonalAcheive(
                              
                              e.target.value,
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div className="section">
                      <Typography
                        sx={{ color: "#228B22", fontSize: { xs: 20, sm: 30 } }}
                      >
                        Images of Your Recent Work
                        <Divider />
                      </Typography>
                      <div class="">
                        <i class="fas fa-lock"></i>
                        <input
                          type="file"
                          accept=".png, .jpeg, .jpg"
                          onChange={(e) => {
                            setimages(e.target.files);
                          }}
                          multiple
                        />
                        {/* <span class='button'>Choose</span>
                <span class='label' data-js-label>No file selected</span> */}
                      </div>

                      <button
                        class="btn-register mt-4"
                        type="button"
                        onClick={createcall}
                      >
                        Submit
                      </button>
                    </div>

                   
                  </div>
                </form>
              </div>
            </Box>
          </Box>
          {uploaded == true ? (
            <div
              style={{ position: "relative", width: "100%", zIndex: "10000" }}
            >
              <Alert severity="success" variant="filled">
                Posted Successfully
              </Alert>
            </div>
          ) : error != null ? (
            <div
              style={{ position: "relative", width: "100%", zIndex: "10000" }}
            >
              <Alert severity="error" variant="filled">
                Something Went Wrong
              </Alert>
            </div>
          ) : null}
        </Container>
        {uploading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : null}
      </div>
    </div>
  );
}

export default Create;
