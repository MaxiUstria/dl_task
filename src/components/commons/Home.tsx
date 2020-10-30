import React from 'react';
import { ICurrent } from '../../types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Navbar from './Navbar';
import BankAccountsPage from '../bankAccounts/BankAccountsPage';

export interface HomeProps {
  isAuthenticated: boolean | null;
}

const Home = (props: HomeProps) => {
  return (
    <>
      {!props.isAuthenticated ? (
        <Redirect to="/log_in" />
      ) : (
        <>
          <Navbar />
          <BankAccountsPage />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: ICurrent) => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

export default connect(mapStateToProps, null)(Home);
