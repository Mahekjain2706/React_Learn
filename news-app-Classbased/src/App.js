
import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News.js';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

// in class base and function base component state and props are little bit diff.
// in this class base component management of methods is quite easy.


// top loading bar
export default class App extends Component {
  pageSize =  20;
  apiKey = process.env.REACT_APP_SECRET_CODE
  state = {
       progress:0,
  }
  setProgress = (progress) => {
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
          height= {3}
              color='#f11946'
              progress={this.state.progress}
              // onLoaderFinished={() => setProgress(0)}
            />
          <Routes>
            <Route exact path="/home" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general"   pageSize={this.pageSize} country="in"   Ccolor="primary" category="general" />} />
            <Route exact path="business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business"   pageSize={this.pageSize} country="in"   Ccolor="success" category="business" />} />
            <Route exact path="entertainment" element=  {<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="in"  Ccolor="danger"  category="entertainment" />} />
            <Route exact path="general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general"   pageSize={this.pageSize} country="in"   Ccolor="primary" category="general" />} />
            <Route exact path="health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health"   pageSize={this.pageSize} country="in"   Ccolor="warning" category="health" />} />
            <Route exact path="science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science"   pageSize={this.pageSize} country="in"   Ccolor="success" category="science" />} />
            <Route exact path="sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports"   pageSize={this.pageSize} country="in"   Ccolor="danger" category="sports" />} />
            <Route exact path="technology" element=  {<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="in"   Ccolor="info" category="technology" />} />
          </Routes>
        </Router>

      </div>
    )
  }
}
