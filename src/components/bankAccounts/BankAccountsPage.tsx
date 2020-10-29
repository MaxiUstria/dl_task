import * as React from 'react';
import { Component } from 'react';
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

export interface BankAccountsPageState {}

class BankAccountsPage extends Component<
  BankAccountsPageProps,
  BankAccountsPageState
> {
  componentDidMount() {
    const { user, bankAccounts, getAccounts } = this.props;
    if (!bankAccounts || bankAccounts.length === 0) {
      if (user) {
        getAccounts(user.id);
      }
    }
  }
  render() {
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
              {this.props.bankAccounts.map((account: any) => (
                <TableRow key={account.id}>
                  <TableCell component="th" scope="account">
                    {account.id}
                  </TableCell>
                  <TableCell >{account.number}</TableCell>
                  <TableCell >{account.currency}</TableCell>
                  <TableCell >
                    {this.props.user.username}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
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
