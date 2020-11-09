import React, { useState } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkUser } from '../../back/dataApi';
import { toast } from 'react-toastify';

import { authenticate } from '../../redux/actions/userActions';
import { ICurrent } from '../../types';

export interface LogInProps {
  authenticateConnect: (username: string, password: string) => void;
  isAuthenticated: boolean | null;
}

export interface LogInState {
  username: string;
  password: string;
}

const LogIn = (props: LogInProps) => {
  const [user, setUser] = useState<LogInState>({
    username: '',
    password: '',
  });
  const setUsernameValue = (username: string) => {
    setUser({ ...user, username });
  };
  const setPasswordValue = (password: string) => {
    setUser({ ...user, password });
  };

  const logIn = async () => {
    const correctUser = await checkUser(user.username, user.password);
    if (correctUser) {
      props.authenticateConnect(user.username, user.password);
      toast.success('Logged in.');
    } else {
      toast.error('Login failed.');
    }
  };
  return (
    <>
      {props.isAuthenticated && <Redirect to="/" />}
      <Grid container justify="center" style={{ marginTop: '5em' }}>
        <form noValidate autoComplete="off">
          <div style={{ display: 'block' }}>
            <TextField
              label="Username"
              name="username"
              value={user.username}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                setUsernameValue(ev.target.value)
              }
            />
          </div>
          <div style={{ display: 'block' }}>
            <TextField
              label="password"
              type="password"
              name="password"
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                setPasswordValue(ev.target.value)
              }
            />
          </div>
          <br></br>
          <Grid container justify="flex-end">
            <Button variant="contained" color="primary" onClick={logIn}>
              Log in
            </Button>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

const mapDispatchToProps = {
  authenticateConnect: authenticate,
};

const mapStateToProps = (state: ICurrent) => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
