import * as React from 'react';

import Navbar from '../commons/Navbar';

export interface TransactionResumeProps {
  transaction: any;
}

const TransactionResume = (props: TransactionResumeProps) => {
  return (
    <div>
          <h1>Transaction Resume</h1>
          <p>{props.transaction.origin}</p>
          <p>{props.transaction.destination}</p>
          <p>{props.transaction.amount}</p>
          <p>{props.transaction.currency}</p>
          <p>{props.transaction.comment}</p>
    </div>
  );
};

export default TransactionResume;
