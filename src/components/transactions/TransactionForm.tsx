import * as React from 'react';

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Grid,
} from '@material-ui/core/';

type BankAccountFormProps = {
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


const BankAccountForm = (props: BankAccountFormProps) => {
  const changeSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    let value: string = event.target.value as string;
  
    props.onChangeOrigin(value);
  }  
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
              error={props.errors.origin ? true : false}
              value={props.originAccountId}
              onChange={(e) => changeSelect(e)}
            >
              {props.bankAccounts.map((account: any) => {
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
              error={props.errors.destination ? true : false}
              helperText={props.errors.destination}
              value={props.destinationAccountId}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                props.onChangeDestination(ev.target.value)
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
              error={props.errors.amount ? true : false}
              helperText={props.errors.amount}
              value={props.amount}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                props.onChangeAmount(ev.target.value)
              }
            />
            <TextField
              id="standard-basic"
              label="Comment"
              inputProps={{ maxLength: 255 }}
              value={props.comment}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                props.onChangeComment(ev.target.value)
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
            onClick={props.nextStep}
          >
            Next
          </Button>
        </ Grid>
        </div>
      </form>
      </Grid>
    </div>
  );
};

export default BankAccountForm;
