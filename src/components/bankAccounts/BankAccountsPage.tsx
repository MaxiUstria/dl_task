import * as React from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BankAccounts, BankAccount, ICurrent, User } from '../../types';
import { getAccounts } from '../../back/dataApi';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export interface BankAccountsPageProps {
  user?: User;
  isAuthenticated?: boolean | null;
}

const BankAccountsPage = (props: BankAccountsPageProps) => {
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
  return (
    <div>
      <h2>Bank Accounts</h2>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Account Id</TableCell>
              <TableCell>Account Number</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bankAccounts.map((account: BankAccount) => (
              <TableRow key={account.id}>
                <TableCell component="th" scope="account">
                  {account.id}
                </TableCell>
                <TableCell>{account.number}</TableCell>
                <TableCell>{account.currency}</TableCell>
                <TableCell>{props.user?.username}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const mapStateToProps = (state: ICurrent) => {
  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
  };
};

export default connect(mapStateToProps, null)(BankAccountsPage);
