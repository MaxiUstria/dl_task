import * as React from 'react';
import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTransactionsList } from '../../redux/actions/current';

import { ICurrent } from '../../types';
import Navbar from '../commons/Navbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export interface TransactionIndexProps {
  isAuthenticated?: boolean | null;
  transactions?: any;
  user?: any;
  getTransactions: (userId: number) => void;
}

export interface TransactionIndexState {}

class TransactionIndex extends Component<
  TransactionIndexProps,
  TransactionIndexState
> {
  componentDidMount() {
    const { user, getTransactions } = this.props;
    if (user) {
      getTransactions(user.id);
    }
  }
  render() {
    return (
      <div>
        {!this.props.isAuthenticated ? (
          <Redirect to="/log_in" />
        ) : (
          <>
            <Navbar />
            <h1>Transactions</h1>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction Id</TableCell>
                    <TableCell>Origin Account Number</TableCell>
                    <TableCell>Destination Account Number</TableCell>
                    <TableCell>Currency</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Comment</TableCell>
                  </TableRow>
                </TableHead>
                {this.props.transactions ? (
                  <TableBody>
                    {this.props.transactions.map((transaction: any) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.id}</TableCell>
                        <TableCell>{transaction.origin}</TableCell>
                        <TableCell>{transaction.destination}</TableCell>
                        <TableCell>{transaction.currency}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>{transaction.comment}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                ) : (
                  <></>
                )}
              </Table>
            </TableContainer>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: ICurrent) => {
  return {
    transactions: state.transactions,
    isAuthenticated: state.isAuthenticated,
    user: state.user,
  };
};

const mapDispatchToProps = {
  getTransactions: getTransactionsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionIndex);
