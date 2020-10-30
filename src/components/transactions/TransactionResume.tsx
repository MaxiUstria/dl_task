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
        <p>
          <b>Origin Account:</b> {props.transaction.origin}
        </p>
        <p>
          <b>Destination Account:</b> {props.transaction.destination}
        </p>
        <p>
          <b>Amount:</b> {props.transaction.amount}
        </p>
        <p>
          <b>Currency:</b> {props.transaction.currency}
        </p>
        <p>
          <b>Exchange Info:</b> {props.transaction.exchangeInfo}
        </p>
        <p>
          <b>Comment:</b> {props.transaction.comment}
        </p>
      </Container>
    </div>
  );
};

export default TransactionResume;
