import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';

import { unauthenticate } from '../../redux/actions/current';
import { ICurrent, User } from '../../types';

export interface LogOutProps {
  unauthenticateConnect: () => void;
}

export interface LogOutState {
  username: string;
  password: string;
}

class LogOut extends Component<LogOutProps, LogOutState> {
  handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    alert(event.currentTarget.tagName); // alerts BUTTON
  }
  render() {
    return (
      <div className="LogOut">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={this.props.unauthenticateConnect}
        >
          Log Out
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: ICurrent) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  unauthenticateConnect: unauthenticate,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);
