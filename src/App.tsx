import React from 'react';
import { Router, Route } from 'react-router-dom';
import Home from './components/commons/Home';
import './App.css';

import history from './utils/history';
import LogIn from './components/authentication/LogIn';
import TransactionNew from './components/transactions/TransactionNew';
import TransactionResume from './components/transactions/TransactionResume';
import TransactionIndex from './components/transactions/TransactionIndex';


function App() {
  return (
    <div className="container-fluid">
      <Router history={history}>
        <Route path="/" exact={true} component={Home} />
        <Route
          path="/new_transaction"
          exact={true}
          component={TransactionNew}
        />
        <Route
          path="/show_transaction"
          exact={true}
          component={TransactionResume}
        />
        <Route path="/transactions" exact={true} component={TransactionIndex} />
        <Route path="/log_in" exact={true} component={LogIn} />
      </Router>
    </div>
  );
}

export default App;