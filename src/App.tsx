import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './components/commons/Home';
import './App.css';

import history from "./history";
import LogIn from './components/authentication/LogIn';


function App() {
  return (
    (
    <div className="container-fluid">
        <Router history={history}>
          <Route path="/" exact={true} component={Home} />
          <Route path="/log_in" exact={true} component={LogIn} />
        </Router>
    </div>
  )
  )
}

export default App;
