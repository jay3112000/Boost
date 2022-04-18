import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import '../Components/WorkEdStyles.css'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});
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
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
export default function CenteredTabs({resumedata}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="EDUCATION" />
        <Tab label="EXPERIENCE" />
      </Tabs>
       <TabPanel value={value} index={0}>
      
{
  resumedata.Education!=null?
  resumedata.Education.map((curr,index)=>{
    return(
      <ul class="timeline">
  
  <li>
    <div class="direction-r" className={parseFloat(index)%2==0?"direction-r":"direction-l"} key={index}>
      <div class="flag-wrapper">
        <span class="hexa"></span>
        <span class="flag">{curr.Name}</span>
        <span class="time-wrapper"><span class="time"  style={{"backgroundColor":`${resumedata.Color}`}}>{curr.Startdate}-{curr.Enddate}</span></span>
      </div>
      <div class="desc">{curr.Degree}</div>
    </div>
  </li> 
  
</ul>
    )
  }):null
}

      </TabPanel> 
      <TabPanel value={value} index={1}>
      {
  resumedata.Workexp!=null?
  resumedata.Workexp.map((curr,index)=>{
    return(
      <ul class="timeline">
  
  <li>
    <div class="direction-r" className={parseFloat(index)%2==0?"direction-r":"direction-l"} key={index}>
      <div class="flag-wrapper">
        <span class="hexa"></span>
        <span class="flag">{curr.Cname}</span>
        <span class="time-wrapper"><span class="time" style={{"backgroundColor":`${resumedata.Color}`}}>{curr.Startdate}-{curr.Enddate}</span></span>
      </div>
      <div class="desc">{curr.Title}</div>
    </div>
  </li> 
  
</ul>
    )
  }):null
}
      </TabPanel>
    </Paper>
  );
}
 