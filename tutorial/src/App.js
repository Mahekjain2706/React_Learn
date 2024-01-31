
import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import React, { useState } from 'react';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// different color palid dark mode , not count empty string
// spaces lentence,layout shift,if text empty button not work.
// Routers Dom 

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message,type)=>{
       setAlert({
         msg : message,
         type : type
       })
       setTimeout(() =>{
        setAlert(null);
       },2000);
  }

  const removeBodyClasses=()=>{
      document.body.classList.remove('bg-light');
      document.body.classList.remove('bg-dark');
      document.body.classList.remove('bg-warning');
      document.body.classList.remove('bg-success');
      document.body.classList.remove('bg-primary');
      document.body.classList.remove('bg-danger');
  }
  
  const toggleMode = (cls)=>{
    removeBodyClasses();
    console.log(cls);
    document.body.classList.add('bg-'+cls)
    if(mode==='light'){
      setMode('dark');
      document.body.style.backgroundColor = '#112b45';
      showAlert("Enable Dark Mode","success");
      document.title = 'TextUtils - Dark Mode';
      // setInterval(() => {
      //   document.title = 'TextUtils is Amazing Mode';
      // },2000);
      // setInterval(() => {
      //   document.title = 'Install TextUtils Now';
      // },1500);
    }else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Enable Light Mode","success");
      document.title = 'TextUtils - Light Mode';
    }
  }
  return (
    <Router>
      <Navbar title="TextUtils" aboutText="About" mode={mode} toggleMode={toggleMode}/>
      <Alert alert={alert}/>
      <div className="container my-3">
      <Routes>
          <Route path='/' element={<TextForm heading="Enter The text to analyze below " mode={mode} showAlert={showAlert} />}/>
          <Route path='/about' element={<About mode={mode}/>}/>
      </Routes>
      </div>
    </Router>

  ); 
}

export default App;
