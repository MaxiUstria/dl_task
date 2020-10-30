import React from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

import { unauthenticate } from '../../redux/actions/userActions';
import { ICurrent } from '../../types';

export interface LogOutProps {
  unauthenticateConnect: () => void;
}

const LogOut = (props: LogOutProps) => {
  return (
    <div className="LogOut">
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={props.unauthenticateConnect}
      >
        Log Out
      </Button>
    </div>
  );
};

const mapStateToProps = (state: ICurrent) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  unauthenticateConnect: unauthenticate,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);
