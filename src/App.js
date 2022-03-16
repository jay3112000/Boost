import './App.css';
import Home from './pages/Home';
import Register from './pages/register';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Create from './pages/create';
import { useEffect } from 'react';
import Resume from './pages/Resume';
import Edit from './pages/Edit';

function App() {
  
      const token=localStorage.getItem('token')
    console.log(token)
  
  return (
    <div className="App">
       <>
    <Router>
     
         
         <Switch>
         
         <Route path='/' exact component={token==null? Register:Home} />
         <Route path='/home' component={Home} />
         <Route path='/create' component={Create} />
         <Route path='/resume/:id' component={Resume} />
         <Route path='/edit/:id' component={Edit} />
         
        </Switch>       
        
    </Router>
      </>
    </div>
  );
}

export default App;
