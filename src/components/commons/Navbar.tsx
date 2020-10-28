import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ICurrent, User } from '../../types';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from '@material-ui/core';

import LogOut from '../authentication/LogOut';

export interface NavbarProps {
  user?: User | null;
}

export interface NavbarState {}

class Navbar extends Component<NavbarProps, NavbarState> {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Box display="flex" flexGrow={1}></Box>
          <IconButton
            edge="start"
            color="secondary"
            aria-label="menu"
          ></IconButton>
          {this.props.user ? (
            <Typography variant="h6" color="inherit">
              Welcome, {this.props.user.name}
            </Typography>
          ) : (
            console.log('vacio')
          )}
          <LogOut />
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state: ICurrent) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(Navbar);
