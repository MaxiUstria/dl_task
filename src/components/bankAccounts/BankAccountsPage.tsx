import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { ICurrent } from '../../types';
import { getBankAccounts } from '../../redux/actions/current';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export interface BankAccountsPageProps {
  user: any;
  bankAccounts: any;
  isAuthenticated: boolean | null;
  getAccounts: (userId: number) => void;
}

const BankAccountsPage = (props: BankAccountsPageProps) => {
  useEffect(() => {
    const { user, bankAccounts, getAccounts } = props;
    if (!bankAccounts || bankAccounts.length === 0) {
      if (user) {
        getAccounts(user.id);
      }
    }
  });
  return (
    <div>
      <h2>Bank Accounts</h2>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Account Id</TableCell>
              <TableCell >Account Number</TableCell>
              <TableCell >Currency</TableCell>
              <TableCell >User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.bankAccounts.map((account: any) => (
              <TableRow key={account.id}>
                <TableCell component="th" scope="account">
                  {account.id}
                </TableCell>
                <TableCell >{account.number}</TableCell>
                <TableCell >{account.currency}</TableCell>
                <TableCell >
                  {props.user.username}
                </TableCell>
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
    bankAccounts: state.bankAccounts,
    user: state.user,
    isAuthenticated: state.isAuthenticated,
  };
};

const mapDispatchToProps = {
  getAccounts: getBankAccounts,
};

export default connect(mapStateToProps, mapDispatchToProps)(BankAccountsPage);
