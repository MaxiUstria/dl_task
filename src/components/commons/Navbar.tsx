import * as React from 'react';
import { connect } from 'react-redux';
import { ICurrent, User } from '../../types';
import { Link } from 'react-router-dom';

import { AppBar, Toolbar, Button, Typography, Box } from '@material-ui/core';

import LogOut from '../authentication/LogOut';

export interface NavbarProps {
  user?: User;
}

const Navbar = (props: NavbarProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" flexGrow={1}>
          <Button
            component={Link}
            to="/transactions"
            variant="contained"
            color="primary"
          >
            Transactions
          </Button>
          <Button component={Link} to="/" variant="contained" color="primary">
            Accounts
          </Button>
          <Button
            component={Link}
            to="/new_transaction"
            variant="contained"
            color="secondary"
          >
            New Transaction
          </Button>
        </Box>
        {props.user ? (
          <Typography variant="h6" color="inherit">
            Welcome, {props.user.name}
          </Typography>
        ) : (
          <></>
        )}
        <Button
          component={Link}
          to="/profile"
          variant="contained"
          color="primary"
        >
          Profile
        </Button>
        <LogOut />
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state: ICurrent) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(Navbar);
