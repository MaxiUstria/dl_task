import * as React from 'react';
import { Component } from 'react';

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Grid,
} from '@material-ui/core/';

export interface BankAccountFormProps {
  onChangeComment: (comment: string) => void;
  onChangeOrigin: (origin: string) => void;
  onChangeDestination: (destination: string) => void;
  onChangeAmount: (amount: string) => void;
  nextStep: () => void;
  bankAccounts: any;
  errors: any;
  originAccountId: string;
  destinationAccountId: string;
  amount: string;
  comment: string;
}

export interface BankAccountFormState {}

class BankAccountForm extends Component<
  BankAccountFormProps,
  BankAccountFormState
> {
  changeSelect(event: React.ChangeEvent<{ value: unknown }>) {
    var value: string = event.target.value as string;

    this.props.onChangeOrigin(value);
  }
  render() {
    return (
      <div className="Login">
        <h1>Create Transaction</h1>
        <Grid container justify = "center" style={{marginTop: "5em"}}>
          <form noValidate autoComplete="off">
          <div style={{ display: 'block' }}>
            <FormControl>
              <InputLabel id="demo-mutiple-name-label">Origin</InputLabel>
              <Select
                labelId="demo-customized-select-label"
                id="demo-simple-select"
                name="originAccountId"
                error={this.props.errors.origin ? true : false}
                value={this.props.originAccountId}
                onChange={(e) => this.changeSelect(e)}
              >
                {this.props.bankAccounts.map((account: any) => {
                  return (
                    <MenuItem key={account.id} value={account.number}>
                      {account.number}
                    </MenuItem>
                  );
                })}
              </Select>
              <TextField
                id="standard-basic"
                label="Destination"
                name="destinyAccountId"
                error={this.props.errors.destination ? true : false}
                helperText={this.props.errors.destination}
                value={this.props.destinationAccountId}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  this.props.onChangeDestination(ev.target.value)
                }
              />
            </FormControl>
          </div>
          <div style={{ display: 'block' }}>
            <FormControl>
              <TextField
                id="standard-basic"
                label="Amount"
                name="amount"
                type="number"
                error={this.props.errors.amount ? true : false}
                helperText={this.props.errors.amount}
                value={this.props.amount}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  this.props.onChangeAmount(ev.target.value)
                }
              />
              <TextField
                id="standard-basic"
                label="Comment"
                inputProps={{ maxLength: 255 }}
                value={this.props.comment}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  this.props.onChangeComment(ev.target.value)
                }
                multiline
              />
            </FormControl>
          </div>
          <br></br>
          <div style={{ display: 'block' }}>
          <Grid container justify="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={this.props.nextStep}
            >
              Next
            </Button>
          </ Grid>
          </div>
        </form>
        </Grid>
      </div>
    );
  }
}

export default BankAccountForm;
