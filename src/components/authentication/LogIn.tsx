import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { authenticate } from '../../redux/actions/current';
import { ICurrent } from '../../types';

export interface LogInProps {
  authenticateConnect: (username: string, password: string) => void;
  isAuthenticated: boolean | null;
}

export interface LogInState {
  username: string;
  password: string;
}

class LogIn extends Component<LogInProps, LogInState> {
  state = { username: '', password: '' };
  setUsernameValue = (username: string) => {
    this.setState({ username });
  };
  setPasswordValue = (password: string) => {
    this.setState({ password });
  };
  render() {
    return (
      <>
        {this.props.isAuthenticated && <Redirect to="/" />}
        <div className="Login">
          <form noValidate autoComplete="off">
            <div style={{ display: 'block' }}>
              <TextField
                label="Username"
                name="username"
                value={this.state.username}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  this.setUsernameValue(ev.target.value)
                }
              />
            </div>
            <div style={{ display: 'block' }}>
              <TextField
                label="password"
                type="password"
                name="password"
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  this.setPasswordValue(ev.target.value)
                }
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() =>
                this.props.authenticateConnect(
                  this.state.username,
                  this.state.password,
                )
              }
            >
              Log in
            </Button>
          </form>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = {
  authenticateConnect: authenticate,
};

const mapStateToProps = (state: ICurrent) => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
