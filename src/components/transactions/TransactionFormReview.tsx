import * as React from 'react';

import { Button, TextField, Grid, FormControl } from '@material-ui/core/';


export interface TransactionFormReviewProps {
  originAccountId: string;
  destinationAccountId: string;
  convertedAmount: string;
  convertedCurrency: string;
  comment: string;
  backStep: () => void;
  submitForm: () => void;
}

const TransactionFormReview = (props: TransactionFormReviewProps) => {
  return (
    <div>
      <h1>Transaction review</h1>
      <Grid container justify="center" style={{ marginTop: '5em' }}>
        <FormControl>
          <TextField
            disabled
            id="filled-disabled"
            label="Origin"
            value={props.originAccountId}
            variant="filled"
          />
          <TextField
            disabled
            id="filled-disabled"
            label="Destination"
            value={props.destinationAccountId}
            variant="filled"
          />
          <TextField
            disabled
            id="filled-disabled"
            label="Currency"
            value={
              props.convertedCurrency + ' ' + props.convertedAmount
            }
            variant="filled"
          />
          <TextField
            disabled
            id="filled-disabled"
            label="Comment"
            value={props.comment}
            variant="filled"
          />
          <Button
            type="submit"
            variant="contained"
            onClick={props.backStep}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={props.submitForm}
          >
            Submit
          </Button>
        </FormControl>
      </Grid>
    </div>
  );
}

export default TransactionFormReview;
