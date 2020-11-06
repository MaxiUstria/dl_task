import * as React from 'react';
import { useState } from 'react';
import { BankAccount } from '../../types';
import { findAccount, updateAccount } from '../../back/dataApi'

import {
  FormControl,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';

export interface AccountProps {
  account: BankAccount;
  onDelete: (id: number) => void;
}

const Account = (props: AccountProps) => {
    const [accountData, setAccountData] = useState({
      number: props.account.number,
      currency: props.account.currency,
    });
    const [errors, setErrors] = useState({
        account: '',
        currency: '',
      });

    const handleChangeEvent = (prop: string, value: string) => {
        setAccountData({ ...accountData, [prop]: value });
      };

      const changeSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
        let value: string = event.target.value as string;
      
        setAccountData({ ...accountData, currency: value });
      }
    

      const validateForm = async (
        oldAccount: string,
        newAccount: string,
        currency: string,
      ) => {
        let errors = { currency: '', account: '' };
        let paramsOk = true;
    
        if (!currency) {
          errors.currency = "Currency can't be blank.";
          paramsOk = false;
        }
    
        if (!newAccount) {
          errors.account = "Account can't be blank.";
          paramsOk = false;
        } else if (newAccount !== oldAccount) {
          const account = await findAccount(newAccount);
          if (account) {
            errors.account = 'Account already taken.';
            paramsOk = false;
          }
        }
        setErrors(errors);
        return paramsOk;
      };

      const handleUpdate = () => {
        validateForm(props.account.number, accountData.number, accountData.currency).then((paramsOk) => {
            if (paramsOk){
                updateBankAccount(props.account.number, accountData.number, accountData.currency)
            }
        })
      }

      const updateBankAccount = async (
        oldAccount: string,
        newAccount: string,
        currency: string,
      ) => {
            updateAccount(oldAccount, newAccount, currency).then(() => {
              toast.success('Account updated.');
            });
      };
  return (
    <div>
      <Grid item xs={12} style={{marginTop: "4em"}}>
        <FormControl style={{ paddingRight: "10px" }}>
          <TextField error={errors.account ? true : false}
            helperText={errors.account} label="Account" name="number" value={accountData.number} onChange={(e) => handleChangeEvent("number", e.target.value)}/>
        </FormControl>
        <FormControl>
        <InputLabel >Currency</InputLabel>
          <Select
          error={errors.currency ? true : false}
            labelId="Currency"
            name="currency"
            value={accountData.currency}
            onChange={(e) => changeSelect(e)}
          >
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'$U'}>$U</MenuItem>
            <MenuItem value={'EUR'}>EUR</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <Button onClick={handleUpdate}>
            <EditIcon style={{ paddingTop: "15px" }} />
          </Button>
        </FormControl>
        <FormControl>
          <Button onClick={() => props.onDelete(props.account.id)}>
            <DeleteIcon style={{ paddingTop: "15px" }} />
          </Button>
        </FormControl>
      </Grid>
    </div>
  );
};

export default Account;
