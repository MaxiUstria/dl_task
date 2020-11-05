import * as React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { ICurrent } from '../../types';
import { Redirect } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Navbar from '../commons/Navbar';
import LeftBar from '../commons/LeftBar';
import UserInfo from './UserInfo';
import PasswordModifyer from './PasswordModifyer';

export interface ProfileProps {
  isAuthenticated: boolean;
}

const Profile = (props: ProfileProps) => {
  const [pageSelector, setPageSelector] = useState<String>('user_info');

  const renderContent = () => {
    return (
      <Grid container spacing={0}>
        <Navbar />
        <Grid item xs={3}>
          <LeftBar changePage={setPageSelector} />
        </Grid>
        <Grid item xs={9}>
          {pageSelector === 'user_info' ? (
            <UserInfo />
          ) : pageSelector === 'password' ? (
            <PasswordModifyer />
          ) : (
            <p>Bank Accounts</p>
          )}
        </Grid>
      </Grid>
    );
  };

  return (
    <div>
      {!props.isAuthenticated ? <Redirect to="/log_in" /> : renderContent()}
    </div>
  );
};

const mapStateToProps = (state: ICurrent) => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

export default connect(mapStateToProps, null)(Profile);
