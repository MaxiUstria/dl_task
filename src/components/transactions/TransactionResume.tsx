import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { ICurrent } from '../../types';
import Navbar from '../commons/Navbar';

export interface TransactionResumeProps {
  isAuthenticated?: boolean | null;
  transaction?: any;
}

const TransactionResume = (props: TransactionResumeProps) => {
  return (
    <div>
      {!props.isAuthenticated ? (
        <Redirect to="/log_in" />
      ) : (
        <>
          <Navbar />
          <h1>Transaction Resume</h1>
          <p>{props.transaction.id}</p>
          <p>{props.transaction.origin}</p>
          <p>{props.transaction.destination}</p>
          <p>{props.transaction.amount}</p>
          <p>{props.transaction.currency}</p>
          <p>{props.transaction.comment}</p>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: ICurrent) => {
  return {
    transaction: state.transaction,
    isAuthenticated: state.isAuthenticated,
  };
};

export default connect(mapStateToProps, null)(TransactionResume);
