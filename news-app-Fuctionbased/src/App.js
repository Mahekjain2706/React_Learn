
import './components/App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News.js';
import LoadingBar from 'react-top-loading-bar'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";

// in class base and function base component state and props are little bit diff.
// in this class base component management of methods is quite easy.


// top loading bar
const App = () =>{
  const pageSize =  20;
  const apiKey = process.env.REACT_APP_SECRET_CODE
  const [progress, setProgress] = useState(0);

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
          height= {3}
              color='#f11946'
              progress={progress}
              // onLoaderFinished={() => setProgress(0)}
            />
          <Routes>
            <Route exact path="/home" element={<News setProgress={setProgress} apiKey={apiKey} key="general"   pageSize={pageSize} country="in"   Ccolor="primary" category="general" />} />
            <Route exact path="business" element={<News setProgress={setProgress} apiKey={apiKey} key="business"   pageSize={pageSize} country="in"   Ccolor="success" category="business" />} />
            <Route exact path="entertainment" element=  {<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in"  Ccolor="danger"  category="entertainment" />} />
            <Route exact path="general" element={<News setProgress={setProgress} apiKey={apiKey} key="general"   pageSize={pageSize} country="in"   Ccolor="primary" category="general" />} />
            <Route exact path="health" element={<News setProgress={setProgress} apiKey={apiKey} key="health"   pageSize={pageSize} country="in"   Ccolor="warning" category="health" />} />
            <Route exact path="science" element={<News setProgress={setProgress} apiKey={apiKey} key="science"   pageSize={pageSize} country="in"   Ccolor="success" category="science" />} />
            <Route exact path="sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports"   pageSize={pageSize} country="in"   Ccolor="danger" category="sports" />} />
            <Route exact path="technology" element=  {<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in"   Ccolor="info" category="technology" />} />
          </Routes>
        </Router>

      </div>
    )
}
export default App;
