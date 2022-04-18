import React from 'react';
import ReactDOM from 'react-dom';
import {Authcontextprovider} from './contextApi/Authcontext'
import App from './App';
import { ResumeListcontextprovider } from './contextApi/ResumeList';
import { CEResumecontextprovider } from './contextApi/CreateEditResume';

ReactDOM.render(
  <React.StrictMode>
    <Authcontextprovider>
      <ResumeListcontextprovider>
        <CEResumecontextprovider>
    <App />
    </CEResumecontextprovider>
    </ResumeListcontextprovider>
    </Authcontextprovider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

