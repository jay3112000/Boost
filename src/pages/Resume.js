import { Container } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MiniDrawer from "../Components/Sidedrawer";
import { useParams } from "react-router-dom";
import axios from "axios";
import ExampleOne from "../Components/AnimatedText";
import emailjs from "emailjs-com";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import "./Resume.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ServiceList } from "./ServiceList";
import RewardCenteredTabs from "../Components/Certifications";
import CenteredTabs from "../Components/WorkEd";
import LinearWithValueLabel from "../Components/Certifications";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Chatbot from "../Components/Chatbot";

function Resume() {
  const id = useParams().id;
  const [resumedata, setresumedata] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [successMessage, setSuccessMessage] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (data) => console.log(data);
  const serviceID = "service_ID";
  const templateID = "template_ID";
  const userID = "user_kgjbdRcWoIbNW2BtnINzl";

  var w = window.innerWidth;
  var h = window.innerHeight;
  let isPhone;
  if (w > 500 && h > 500) {
    isPhone = false;
  } else {
    isPhone = true;
  }

  const getresume = async () => {
    try {
      const response = await axios.get(
        `https://boost-main.herokuapp.com/api/post/${id}`
      );
      console.log(response.data);
      setresumedata(response.data);
      document.documentElement.style.setProperty(
        "--pcolor",
        response.data.Color
      );
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmitform = (data, r) => {
    sendEmail(
      serviceID,
      templateID,
      {
        toEmail:resumedata.Email,
        fromEmail:data.email,
        name: data.name,
        phone: data.phone,
        email: data.email,
        subject: data.subject,
        description: data.description,
      },
      userID
    );
    reset();
  };

  const sendEmail = (serviceID, templateID, variables, userID) => {
    emailjs
      .send(serviceID, templateID, variables, userID)
      .then(() => {
        handleShow();
      })
      .catch((err) => setSuccessMessage(true));
  };
  const getPercentage = (level) => {
    if (level === "Expert") {
      return "100%";
    }
    if (level === "Intermediate") {
      return "70%";
    }
    if (level === "Beginner") {
      return "30%";
    }
  };

  useEffect(() => {
    getresume();
  }, []);
  return (
    <div>
      <Container
        disableGutters={true}
        maxWidth={false}
        sx={{
          paddingRight: { xs: "0.5rem", sm: "5rem" },
          paddingLeft: { xs: "0.5rem", sm: "5rem" },
        }}
      >
        {/* Home */}

        {/* About Me Scection */}
        <div id="about" className="container py-5 mt-5">
          <div className="row">
            <div className="col-lg-6 col-xm-12 ">
              <div className="row">
                {/* <div class="home__social">
                            <a href="https://www.linkedin.com/" target="_blank" class="home__social-icon">
                               <LinkedInIcon/>
                            </a>

                            <a href="https://dribble.com/" target="_blank" class="home__social-icon">
                                <GitHubIcon/>
                            </a>
                        </div> */}
                <div className="ibox">
                  <img
                    src={`https://boost-main.herokuapp.com/images/${resumedata.Profilepic}`}
                    alt="just wait"
                    className="img-fluid  "
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 my-2">
              <div class="home__data">
                <ExampleOne name={resumedata.Name} color={resumedata.Color} />
                <h2 class="home__subtitle">Frontend Developer</h2>
                
                <p class="home__description">{resumedata.Desc}</p>
                <div className="row my-4">
                  <div className="col-lg-6 col-sm-12 my-2">
                    <h3>08+</h3>
                    <h4 class="about__info-name">Years Expeirence</h4>
                  </div>
                  <div className="col-lg-6 col-sm-12 my-2">
                    <h3>20+</h3>
                    <h4 class="about__info-name">Completed Project</h4>
                  </div>
                  <h5>{`Resume Id - ${resumedata._id}`}</h5>
                </div>
                <Button
                  style={{ "backgroundColor": `${resumedata.Color}`,"padding":"5px","borderRadius":"4px" }}
                  variant="contained"
                  endIcon={<SendIcon />}
                >
                  <a href="#contacts" style={{ color: "white" }}>
                    Contact Me
                  </a>
                </Button>
                {/* <div style={{"backgroundColor":`${resumedata.Color}`,"width":"fit-content"}}>
                            <a href="#contact">
                                <span style={{"color":"white","padding":"5px","box"}}>Contact Me <ArrowRightIcon/> </span>
                            </a>  
                            </div>  */}
              </div>
            </div>
          </div>
        </div>
        {/* SERVICES SECTION */}
        <div className="services">
          <h1 className="pt-3 mx-2"> SERVICES</h1>
          <div className="container my-3">
            {
              isPhone===false?
              <div class="row row-cols-2">
              {resumedata.Services != null
                ? resumedata.Services.map((curr, index) => {
                    return (
                      <div className="col-sm" key={index}>
                        <div className="data-card-container">
                          <a href="#" class="data-card">
                            <h3>{curr.Name}</h3>
                            <h4>{curr.desc}</h4>
                            <a href={curr.Link}>
                              <span class="link-text">
                                View Code
                                <svg
                                  width="25"
                                  height="16"
                                  viewBox="0 0 25 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z"
                                    fill="#753BBD"
                                  />
                                </svg>
                              </span>
                            </a>
                          </a>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>:
              <div
              id="carouselExampleDark"
              class="carousel carousel-dark slide"
              data-bs-ride="carousel"
            >
              
              <div className="carousel-inner">
                {resumedata.Services && (
                  <div className="carousel-item active">
                    <div className="data-card-container">
                          <a href="#" class="data-card">
                            <h3>{resumedata.Services[0].Name}</h3>
                            <h4>{resumedata.Services[0].desc}</h4>
                            <a href={resumedata.Services[0].Link}>
                              <span class="link-text">
                                View Code
                                <svg
                                  width="25"
                                  height="16"
                                  viewBox="0 0 25 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z"
                                    fill="#753BBD"
                                  />
                                </svg>
                              </span>
                            </a>
                          </a>
                        </div>
                  </div>
                )}

                {resumedata.Services != null
                  ? resumedata.Services.slice(1).map((curr, index) => {
                      return (
                        <div className="carousel-item " key={index}>
                        <div className="data-card-container">
                          <a href="#" class="data-card">
                            <h3>{curr.Name}</h3>
                            <h4>{curr.desc}</h4>
                            <a href={curr.Link}>
                              <span class="link-text">
                                View Code
                                <svg
                                  width="25"
                                  height="16"
                                  viewBox="0 0 25 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z"
                                    fill="#753BBD"
                                  />
                                </svg>
                              </span>
                            </a>
                          </a>
                        </div>
                        </div>
                      );
                    })
                  : null}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"

                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"

                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            }
            
          </div>
        </div>

        {/* EDUCATION SECTION */}
        {resumedata && (
          <div id="education" className="experience">
            <h1 className="pt-3 mx-2 text-center">Education and Experience</h1>
            <div className="d-flex justify-content-center my-5">
              <CenteredTabs resumedata={resumedata} />
            </div>
          </div>
        )}

        {/* Achievement SECTION */}
        {resumedata && (
          <div id="achievement" className="experience">
            <h1 className="pt-3 mx-2 text-center">
              Certifications and Achievement
            </h1>
            <div>
              <RewardCenteredTabs resumedata={resumedata} />
            </div>
          </div>
        )}

        {/* Skills SECTION */}

        <div id="skills" className="experience" style={{"marginTop":"30px","marginRight":"20px"}}>
          <h1 className="pt-3 mx-2 text-center">SKILLS</h1>
          <div className="container">
            <div className="row ">
              {resumedata.Skills != null
                ? resumedata.Skills.map((curr, index) => {
                    return (
                      <div className="col-sm-6 mt-5" key={index}>
                        <div class="skills__list grid">
                          <div class="skills__data">
                            <div class="skills__titles">
                              <h3 class="skills___name">{curr.Name}</h3>
                              <span class="skills__number">{curr.Level}</span>
                            </div>
                            <div class="skills__bar">
                              <span
                                class="skills__percentage"
                                style={{
                                  width: getPercentage(curr.Level),
                                  backgroundColor: `${resumedata.Color}`,
                                }}
                              ></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
        {/* PORTFOLIO CAROUSEL */}
        <div id="portfolio">
          <div className="caraousel-container mb-4">
            <div className="container ">
              <div className="d-flex justify-content-center mt-5">
                <h1>PORTFOLIO</h1>
              </div>
              <p className="d-flex justify-content-center">
                Examlples of my most Recent Work
              </p>
              <div
                id="carouselPortfolioCaptions"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselPortfolioCaptions"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselPortfolioCaptions"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselPortfolioCaptions"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div className="carousel-inner">
                  {resumedata.Images && (
                    <div className="carousel-item active">
                      <img
                        src={`https://boost-main.herokuapp.com/images/${resumedata.Images[0]}`}
                        className="d-block w-100"
                        alt="..."
                      />
                    </div>
                  )}

                  {resumedata.Images != null
                    ? resumedata.Images.slice(1).map((curr, index) => {
                        return (
                          <div className="carousel-item " key={index}>
                            <img
                              src={`https://boost-main.herokuapp.com/images/${curr}`}
                              className="d-block w-100"
                              alt="..."
                            />
                          </div>
                        );
                      })
                    : null}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselPortfolioCaptions"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselPortfolioCaptions"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* CONTACT ME SECTION           */}
        <div id="contacts" className="contacts py-4 ">
          <div className="text-center mb-5">
            <h1>Contact me</h1>
          </div>
          <div className="container">
            <form onSubmit={handleSubmit(onSubmitform)}>
              <div className="row">
                <div className="col-md-6 col-xs-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="name"
                    {...register("name")}
                  />
                  {errors.name && <p>Please enter Name</p>}
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    {...register("email")}
                  />
                  {errors.email && <p>Please enter Email Address</p>}
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Phone number"
                    name="phone"
                    {...register("phone")}
                  />
                  {errors.phone && <p>Please enter Phone Number</p>}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    name="subject"
                    {...register("subject")}
                  />
                  {errors.subject && <p>Please enter Subject</p>}
                </div>
                <div className="col-md-6 col-xs-12">
                  <textarea
                    type="textarea"
                    className="form-control"
                    placeholder="Description"
                    name="description"
                    {...register("description", {
                      required: true,
                      maxLength: 80,
                    })}
                  ></textarea>
                  {errors.description && <p>Please enter Description</p>}
                  <button className="btn btn-primary">Send</button>
                  {successMessage ? (
                    <p className="error">There seems to a problem!</p>
                  ) : null}
                </div>
              </div>
            </form>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Message Sent</Modal.Title>
            </Modal.Header>
            <Modal.Body>I will contact you as soon as possible!</Modal.Body>
            <Modal.Footer>
              <button className="btn btn-primary" onClick={handleClose}>
                Close
              </button>
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
                <div className="d-flex">{resumedata.Phone}</div>
                <div className="d-flex">
                  <p>{resumedata.Email}</p>
                </div>
              </div>

              <div className="col-lg-5 col-md-5 col-sm-6 align-items-center mt-2">
                <div className="d-flex justify-content-center">
                  <a href="https://www.linkedin.com/in/jay-sharma-9b4758206/">
                    <i className="bi bi-linkedin mx-2"></i>
                  </a>
                  <a href="https://github.com/jay3112000">
                    <i class="bi bi-github mx-2"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Chatbot/>
    </div>
  );
}

export default Resume;
