import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { ICurrent, User } from '../../types';
import { Link } from 'react-router-dom'

import { AppBar, Toolbar, Button, Typography, Box } from '@material-ui/core';

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
          <Box display="flex" flexGrow={1}>
                <Button component={Link} to="/new_transaction"
                      variant="contained"
                      color="primary"
                    >
                      New Transaction
                    </Button>
          </Box>
          {this.props.user ? (
            <Typography variant="h6" color="inherit">
              Welcome, {this.props.user.name}
            </Typography>
          ) : (
            <></>
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
