import * as React from 'react';
import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { ICurrent } from '../../types';
import Navbar from '../commons/Navbar';

export interface TransactionResumeProps {
  isAuthenticated?: boolean | null;
  transaction?: any;
}

export interface TransactionResumeState {}

class TransactionResume extends Component<
  TransactionResumeProps,
  TransactionResumeState
> {
  render() {
    return (
      <div>
        {!this.props.isAuthenticated ? (
          <Redirect to="/log_in" />
        ) : (
          <>
            <Navbar />
            <h1>Transaction Resume</h1>
            <p>{this.props.transaction.id}</p>
            <p>{this.props.transaction.origin}</p>
            <p>{this.props.transaction.destination}</p>
            <p>{this.props.transaction.amount}</p>
            <p>{this.props.transaction.currency}</p>
            <p>{this.props.transaction.comment}</p>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: ICurrent) => {
  return {
    transaction: state.transaction,
    isAuthenticated: state.isAuthenticated,
  };
};

export default connect(mapStateToProps, null)(TransactionResume);
