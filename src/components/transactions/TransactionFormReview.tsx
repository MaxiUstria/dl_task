import * as React from 'react';
import { Component } from 'react';

import { Button, TextField, Grid, FormControl } from '@material-ui/core/';


export interface TransactionFormReviewProps {
  originAccountId: string;
  destinationAccountId: string;
  amount: string;
  comment: string;
  backStep: () => void;
  submitForm: () => void;
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
        <Grid container justify = "center" style={{marginTop: "5em"}}>
          <FormControl>
            <TextField
              disabled
              id="filled-disabled"
              label="Origin"
              value={this.props.originAccountId}
              variant="filled"
            />
            <TextField
              disabled
              id="filled-disabled"
              label="Destination"
              value={this.props.destinationAccountId}
              variant="filled"
            />
            <TextField
              disabled
              id="filled-disabled"
              label="Amount"
              value={this.props.amount}
              variant="filled"
            />
            <TextField
              disabled
              id="filled-disabled"
              label="Comment"
              value={this.props.comment}
              variant="filled"
            />
            <Button type="submit" variant="contained" onClick={this.props.backStep}>
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.props.submitForm}
            >
              Submit
            </Button>
          </FormControl>
        </Grid>
      </div>
    );
  }
}

export default TransactionFormReview;
