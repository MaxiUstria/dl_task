import * as React from 'react';
import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import history from '../../utils/history';
import { postTransaction } from '../../redux/actions/current';

import TransactionFormReview from './TransactionFormReview';
import TransactionForm from './TransactionForm';
import Navbar from '../commons/Navbar';
import { connect } from 'react-redux';
import { ICurrent } from '../../types';

export interface TransactionNewProps {
  bankAccounts: any;
  isAuthenticated?: boolean | null;
  submitTransaction: (
    originAccountId: string,
    destinationAccountId: string,
    amount: string,
    currency: string,
    comment: string,
  ) => void;
}

export interface TransactionNewState {
  showFormReview: boolean;
  originAccountId: string;
  destinationAccountId: string;
  amount: string;
  comment: string;
}

class TransactionNew extends Component<
  TransactionNewProps,
  TransactionNewState
> {
  state = {
    showFormReview: false,
    originAccountId: '',
    destinationAccountId: '',
    amount: '0',
    comment: '',
  };

  handleCommentValue = (comment: string) => {
    this.setState({ comment });
  };
  handleOriginAccountIdValue = (originAccountId: string) => {
    this.setState({ originAccountId });
  };
  handleDestinationAccountIdValue = (destinationAccountId: string) => {
    this.setState({ destinationAccountId });
  };
  handleamountValue = (amount: string) => {
    this.setState({ amount });
  };
  changeStep = () => {
    this.setState({ showFormReview: !this.state.showFormReview });
  };
  newTransaction = () => {
    this.props.submitTransaction(
      this.state.originAccountId,
      this.state.destinationAccountId,
      this.state.amount,
      'USD',
      this.state.comment,
    );
    history.push('/show_transaction');
  };
  renderContent() {
    if (this.state.showFormReview) {
      return (
        <TransactionFormReview
          {...this.state}
          backStep={this.changeStep}
          submitForm={this.newTransaction}
        />
      );
    }

    return (
      <TransactionForm
        onChangeComment={this.handleCommentValue}
        onChangeOrigin={this.handleOriginAccountIdValue}
        onChangeDestination={this.handleDestinationAccountIdValue}
        onChangeAmount={this.handleamountValue}
        nextStep={this.changeStep}
        bankAccounts={this.props.bankAccounts}
      />
    );
  }
  render() {
    return (
      <div>
        {!this.props.isAuthenticated ? (
          <Redirect to="/log_in" />
        ) : (
          <>
            <Navbar />
            {this.renderContent()}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: ICurrent) => {
  return {
    bankAccounts: state.bankAccounts,
    isAuthenticated: state.isAuthenticated,
  };
};

const mapDispatchToProps = {
  submitTransaction: postTransaction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionNew);
