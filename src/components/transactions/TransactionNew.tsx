import * as React from 'react';
import { Component } from 'react';
import { Redirect } from 'react-router-dom';

import TransactionFormReview from './TransactionFormReview';
import TransactionForm from './TransactionForm';
import Navbar from '../commons/Navbar';
import { connect } from 'react-redux';
import { ICurrent } from '../../types';

export interface TransactionNewProps {
  bankAccounts: any;
  isAuthenticated?: boolean;
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
    console.log(this.state);
  };
  handleOriginAccountIdValue = (originAccountId: string) => {
    this.setState({ originAccountId });
    console.log(this.state);
  };
  handleDestinationAccountIdValue = (destinationAccountId: string) => {
    this.setState({ destinationAccountId });
    console.log(this.state);
  };
  handleamountValue = (amount: string) => {
    this.setState({ amount });
    console.log(this.state);
  };
  renderContent() {
    if (this.state.showFormReview) {
      return <TransactionFormReview />;
    }

    return (
      <TransactionForm
        onChangeComment={this.handleCommentValue}
        onChangeOrigin={this.handleOriginAccountIdValue}
        onChangeDestination={this.handleDestinationAccountIdValue}
        onChangeAmount={this.handleamountValue}
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

export default connect(mapStateToProps, null)(TransactionNew);
