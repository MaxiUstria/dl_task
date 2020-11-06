import * as React from 'react';
import { BankAccount } from '../../types';
import { Container } from '@material-ui/core/';

import {
  FormControl,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export interface AccountProps {
  account: BankAccount;
  onDelete: (id: number) => void;
}

const Account = (props: AccountProps) => {
  return (
    <div>
      <Grid item xs={12}>
        <FormControl>
          <TextField label="Account" name="name" value={props.account.number} />
        </FormControl>
        <FormControl>
          <Select
            labelId="Currency"
            name="Currency"
            value={props.account.currency}
          >
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'$U'}>$U</MenuItem>
            <MenuItem value={'EUR'}>EUR</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <Button>
            <EditIcon />
          </Button>
        </FormControl>
        <FormControl>
          <Button onClick={() => props.onDelete(props.account.id)}>
            <DeleteIcon />
          </Button>
        </FormControl>
      </Grid>
    </div>
  );
};

export default Account;
