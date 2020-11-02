import React from 'react';
import { ICurrent } from '../../types';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import LogIn from '../authentication/LogIn';
import BankAccountsPage from '../bankAccounts/BankAccountsPage';

export interface HomeProps {
  isAuthenticated: boolean | null;
}

const Home = (props: HomeProps) => {
  return (
    <>
      {!props.isAuthenticated ? (
        <LogIn />
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
