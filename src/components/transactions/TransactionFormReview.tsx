import * as React from 'react';
import { Component } from 'react';

export interface BankAccountFormReviewProps {}

export interface BankAccountFormReviewState {}

class BankAccountFormReview extends Component<
  BankAccountFormReviewProps,
  BankAccountFormReviewState
> {
  render() {
    return <h1>Transaction review</h1>;
  }
}

export default BankAccountFormReview;
