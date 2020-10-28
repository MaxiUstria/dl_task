import * as React from 'react';
import { Component } from 'react';

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from '@material-ui/core/';

export interface BankAccountFormProps {
  onChangeComment: (comment: string) => void;
  onChangeOrigin: (origin: string) => void;
  onChangeDestination: (destination: string) => void;
  onChangeAmount: (amount: string) => void;
  bankAccounts: any;
}

export interface BankAccountFormState {}

class BankAccountForm extends Component<
  BankAccountFormProps,
  BankAccountFormState
> {
  changeSelect(event: React.ChangeEvent<{ value: unknown }>) {
    // No longer need to cast to any - hooray for react!
    var value: string = event.target.value as string;

    this.props.onChangeOrigin(value);
  }
  render() {
    return (
      <div className="Login">
        <h1>Create Transaction</h1>
        <form noValidate autoComplete="off">
          <div style={{ display: 'block' }}>
            <FormControl>
              <InputLabel id="demo-mutiple-name-label">Origin</InputLabel>
              <Select
                labelId="demo-customized-select-label"
                id="demo-simple-select"
                name="originAccountId"
                onChange={(e) => this.changeSelect(e)}
              >
                {this.props.bankAccounts.map((account: any) => {
                  return (
                    <MenuItem value={account.id}>{account.number}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl>
              <TextField
                id="standard-basic"
                label="Destination"
                name="destinyAccountId"
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  this.props.onChangeDestination(ev.target.value)
                }
              />
            </FormControl>
            <FormControl>
              <TextField
                id="standard-basic"
                label="Amount"
                name="amount"
                type="number"
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  this.props.onChangeAmount(ev.target.value)
                }
              />
            </FormControl>
            <FormControl>
              <TextField
                id="standard-basic"
                label="Comment"
                inputProps={{ maxLength: 255 }}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  this.props.onChangeComment(ev.target.value)
                }
                multiline
              />
            </FormControl>
          </div>
          <div style={{ display: 'block' }}></div>
        </form>
      </div>
    );
  }
}

export default BankAccountForm;
