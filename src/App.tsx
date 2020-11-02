import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './components/commons/Home';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LogIn from './components/authentication/LogIn';
import TransactionNew from './components/transactions/TransactionNew';
import TransactionResume from './components/transactions/TransactionResume';
import TransactionIndex from './components/transactions/TransactionIndex';
import NotFoundPage from './components/commons/NotFoundPage';


function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Switch>
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
            <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;