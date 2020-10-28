import React, { Component } from 'react';
import { ICurrent } from '../../types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LogIn from '../authentication/LogIn';
import Navbar from './Navbar';

export interface HomeProps {
  isAuthenticated: boolean | null;
}

export interface HomeState {}

class Home extends React.Component<HomeProps, HomeState> {
  render() {
    return (
      <>
        {!this.props.isAuthenticated && <Redirect to="/log_in" />}
        <Navbar />
      </>
    );
  }
}

const mapStateToProps = (state: ICurrent) => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

export default connect(mapStateToProps, null)(Home);
