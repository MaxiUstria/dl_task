import * as React from 'react';
import { Transaction } from '../../types';
import { Container } from '@material-ui/core/';
export interface TransactionResumeProps {
  transaction: Transaction;
}

const TransactionResume = (props: TransactionResumeProps) => {
  return (
    <div>
      <h1>Transaction Resume</h1>
      <Container maxWidth="sm">
        <p id="origin">
          <b>Origin Account:</b> {props.transaction.origin}
        </p>
        <p id="destination">
          <b>Destination Account:</b> {props.transaction.destination}
        </p>
        <p id="amount">
          <b>Amount:</b> {props.transaction.amount}
        </p>
        <p id="currency">
          <b>Currency:</b> {props.transaction.currency}
        </p>
        <p id="exchange">
          <b>Exchange Info:</b> {props.transaction.exchangeInfo}
        </p>
        <p id="comment">
          <b>Comment:</b> {props.transaction.comment}
        </p>
      </Container>
    </div>
  );
};

export default TransactionResume;
