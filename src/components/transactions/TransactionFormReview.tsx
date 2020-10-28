import * as React from 'react';
import { Component } from 'react';

import { Button } from '@material-ui/core/';


export interface TransactionFormReviewProps {
  originAccountId: string;
  destinationAccountId: string;
  amount: string;
  comment: string;
  backStep: () => void;
}

export interface TransactionFormReviewState {}

class TransactionFormReview extends Component<
  TransactionFormReviewProps,
  TransactionFormReviewState
> {
  render() {
    return (
      <div>
        <h1>Transaction review</h1>
        <p>{this.props.originAccountId}</p>
        <p>{this.props.destinationAccountId}</p>
        <p>{this.props.amount}</p>
        <p>{this.props.comment}</p>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={this.props.backStep}
        >
          back
        </Button>
      </div>
    );
  }
}

export default TransactionFormReview;
