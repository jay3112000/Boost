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
      </TabPanel>
      <TabPanel value={value} index={1}>
      <ul class="timeline">
  
  <li>
    <div class="direction-r">
      <div class="flag-wrapper">
        <span class="hexa"></span>
        <span class="flag">Lorem ipsum.</span>
        <span class="time-wrapper"><span class="time">Feb 2015</span></span>
      </div>
      <div class="desc">Lorem ipsum Nisi labore aute do aute culpa magna nulla voluptate exercitation deserunt proident.</div>
    </div>
  </li>

  
  <li>
    <div class="direction-l">
      <div class="flag-wrapper">
        <span class="hexa"></span>
        <span class="flag">Lorem ipsum Anim.</span>
        <span class="time-wrapper"><span class="time">Dec 2014</span></span>
      </div>
      <div class="desc">Lorem ipsum In ut sit in dolor nisi ex magna eu anim anim tempor dolore aliquip enim cupidatat laborum dolore.</div>
    </div>
  </li>

  
  <li>
    <div class="direction-r">
      <div class="flag-wrapper">
        <span class="hexa"></span>
        <span class="flag">Lorem Occaecat.</span>
        <span class="time-wrapper"><span class="time">July 2014</span></span>
      </div>
      <div class="desc">Lorem ipsum Minim labore Ut cupidatat quis qui deserunt proident fugiat pariatur cillum cupidatat reprehenderit sit id dolor consectetur ut.</div>
    </div>
  </li>
</ul>
      </TabPanel>
    </Paper>
  );
}
 