import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ICurrent, BankAccounts, User, BankAccount } from '../../types';
import {
  getAccounts,
  deleteBankAccount,
  findAccount,
} from '../../back/dataApi';
import { toast } from 'react-toastify';

import Account from '../bankAccounts/Account';

export interface BankAccountsModifyerProps {
  user?: User;
}

const BankAccountsModifyer = (props: BankAccountsModifyerProps) => {
  const [bankAccounts, setBankAccounts] = useState<BankAccounts>([]);

  useEffect(() => {
    const { user } = props;
    if (!bankAccounts || bankAccounts.length === 0) {
      if (user) {
        getAccounts(user.id).then((bankAccounts: BankAccounts) => {
          setBankAccounts(bankAccounts);
        });
      }
    }
  }, []);

  const deleteAccount = (accountId: number) => {
    deleteBankAccount(props.user, accountId).then(() => {
      setBankAccounts(
        bankAccounts.filter((account) => account.id !== accountId),
      );
      toast.success('Account deleted');
    });
  };

  return (
    <div>
      {bankAccounts.map((account: BankAccount) => (
        <Account
          key={account.id}
          account={account}
          onDelete={deleteAccount}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state: ICurrent) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(BankAccountsModifyer);
