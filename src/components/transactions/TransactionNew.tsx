import * as React from 'react';
import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import history from '../../utils/history';
import { postTransaction } from '../../redux/actions/current';
import { findAccount, calculateAmount } from '../../back/dataApi';

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
  convertedAmount: string;
  convertedCurrency: string;
  comment: string;
  errors: any;
  destinationAccount: any;
}

class TransactionNew extends Component<
  TransactionNewProps,
  TransactionNewState
> {
  state = {
    showFormReview: false,
    originAccountId: '',
    destinationAccountId: '',
    amount: '',
    convertedAmount: '',
    convertedCurrency: '',
    comment: '',
    errors: {},
    destinationAccount: {},
  };

  handleCommentValue = (comment: string) => {
    this.setState({ comment });
  };
  handleOriginAccountIdValue = (originAccountId: string) => {
    this.setState({ originAccountId });
  };
  handleDestinationAccountIdValue = (destinationAccountId: string) => {
    this.setState({ destinationAccountId });
    const destinationAccount = findAccount(destinationAccountId);
    if (destinationAccount)   {
      const convertedCurrency = destinationAccount.currency;
      this.setState({ destinationAccount, convertedCurrency });
    } else{
      this.setState({ destinationAccount: {} })
    }
  };
  handleamountValue = (amount: string) => {
    this.setState({ amount });
  };
  changeStep = () => {
    let paramsOk: boolean = true;
    if (!this.state.showFormReview) {
      paramsOk = this.validateForm();
      if (paramsOk){
        const convertedAmount: string = calculateAmount(this.state.originAccountId, this.state.destinationAccountId, this.state.amount).toString();
        this.setState({ convertedAmount });
      }
    }

    if (paramsOk) {
      this.setState({ showFormReview: !this.state.showFormReview });
    }
  };
  validateForm = () => {
    const { destinationAccountId, originAccountId, amount, destinationAccount } = this.state;
    let errors: any = {};
    let paramsOk: boolean = true;
    const bankAccount = this.props.bankAccounts.find((account: any) => {
      return account.number === destinationAccountId;
    });

    if (destinationAccountId.length === 0) {
      errors['destination'] = 'Destination can not be empty';
      paramsOk = false;
    } else {
      if (bankAccount) {
        errors['destination'] = 'Destination can not be one of your accounts';
        paramsOk = false;
      } else{
        if (Object.keys(destinationAccount).length === 0){
          errors['destination'] = 'Account does not exist';
          paramsOk = false;
        }
      }
    }

    if (originAccountId.length === 0) {
      errors['origin'] = 'Origin can not be empty';
      paramsOk = false;
    }

    if (amount.length === 0) {
      errors['amount'] = 'Amunt can not be empty';
      paramsOk = false;
    }

    this.setState({ errors });

    return paramsOk;
  };
  newTransaction = () => {
    
    this.props.submitTransaction(
      this.state.originAccountId,
      this.state.destinationAccountId,
      this.state.convertedAmount,
      this.state.convertedCurrency,
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
        {...this.state}
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
