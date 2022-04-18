import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './Certifications.css'
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({resumedata}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  var w = window.innerWidth;
  var h = window.innerHeight;
  let isPhone;
  if (w > 500 && h > 500) {
    isPhone = false;
  } else {
    isPhone = true;
  }

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab style={{"fontSize":isPhone==true?"10px":"13px"}} label="Certificates" {...a11yProps(0)} />
        <Tab style={{"fontSize":isPhone==true?"10px":"13px"}}label="Achievements" {...a11yProps(1)} />
        
      </Tabs>
      <TabPanel value={value} index={0}>
        {
          isPhone===false?
          <div className='row'>
          {
     resumedata.Certificates!=null?
     resumedata.Certificates.map((curr,index)=>{
       return(
         <div className='col'>
            <div class="rewardbox" style={{"borderTop":`3px solid ${resumedata.Color}`}} key={index}>
         <h5>{curr.Name}</h5>
         <p>{curr.Year}</p>
         <img src="https://assets.codepen.io/2301174/icon-calculator.svg" alt=""/>
       </div>
           </div>
        
       )
     }):null
   }
          </div>:
           <div
           id="carouselExampleDark2"
           class="carousel carousel-dark slide"
           data-bs-ride="carousel"
         >
           
           <div className="carousel-inner">
             {resumedata.Certificates && (
               <div className="carousel-item active">
                 <div class="rewardbox" style={{"borderTop":`3px solid ${resumedata.Color}`}} >
         <h5>{resumedata.Certificates[0].Name}</h5>
         <p>{resumedata.Certificates[0].Year}</p>
         <img src="https://assets.codepen.io/2301174/icon-calculator.svg" alt=""/>
       </div>
               </div>
             )}

             {resumedata.Certificates != null
               ? resumedata.Certificates.slice(1).map((curr, index) => {
                   return (
                     <div className="carousel-item " key={index}>
                      <div class="rewardbox" style={{"borderTop":`3px solid ${resumedata.Color}`}} key={index}>
         <h5>{curr.Name}</h5>
         <p>{curr.Year}</p>
         <img src="https://assets.codepen.io/2301174/icon-calculator.svg" alt=""/>
       </div>
                     </div>
                   );
                 })
               : null}
           </div>
           <button
             className="carousel-control-prev"
             type="button"
             data-bs-target="#carouselExampleDark2"
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
             data-bs-target="#carouselExampleDark2"
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
      
    
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className='row'>
        {
      resumedata.Rewards
    !=null?
      resumedata.Rewards
    .map((curr,index)=>{
        return(
          <div className='col'>
            <div class="rewardbox" style={{"borderTop":`3px solid ${resumedata.Color}`}} key={index}>
          <h5>{curr.Name}</h5>
          <p>{curr.Year}</p>
          <img src="https://assets.codepen.io/2301174/icon-karma.svg" alt=""/>
        </div>
            </div>
          
        )
      }):null
    }
        </div>
     
     
      </TabPanel>

    </Box>
  );
}
