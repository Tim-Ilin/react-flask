import React from 'react';
import './App.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "../pages/Home";
import About from '../pages/About'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/about">
          <About/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
