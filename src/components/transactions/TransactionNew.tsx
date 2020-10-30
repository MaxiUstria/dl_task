import React, { useState } from 'react';
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

const TransactionNew = (props: TransactionNewProps) => {
  const [transactionState, setTransactionState] = useState<TransactionNewState>({
    showFormReview: false,
    originAccountId: '',
    destinationAccountId: '',
    amount: '',
    convertedAmount: '',
    convertedCurrency: '',
    comment: '',
    errors: {},
    destinationAccount: {},
  });
  const handleCommentValue = (comment: string) => {
    setTransactionState({ ...transactionState, comment });
  };
  const handleOriginAccountIdValue = (originAccountId: string) => {
    setTransactionState({ ...transactionState, originAccountId });
  };
  const handleDestinationAccountIdValue = (destinationAccountId: string) => {
    const destinationAccount = findAccount(destinationAccountId);
    if (destinationAccount)   {
      const convertedCurrency = destinationAccount.currency;
      setTransactionState({ ...transactionState, destinationAccountId, destinationAccount, convertedCurrency });
    } else{
      setTransactionState({ ...transactionState, destinationAccountId, destinationAccount: {} })
    }
  };
  const handleamountValue = (amount: string) => {
    setTransactionState({ ...transactionState, amount });
  };
  const changeStep = () => {
    let paramsOk: boolean = true;
    if (!transactionState.showFormReview) {
      paramsOk = validateForm();
      if (paramsOk){
        const convertedAmount: string = calculateAmount(transactionState.originAccountId, transactionState.destinationAccountId, transactionState.amount).toString();
        setTransactionState({ ...transactionState, showFormReview: !transactionState.showFormReview, convertedAmount: convertedAmount });
      }
    } else if (paramsOk) {
      setTransactionState({ ...transactionState, showFormReview: !transactionState.showFormReview });
    }

    
  };
  const validateForm = () => {
    const { destinationAccountId, originAccountId, amount, destinationAccount } = transactionState;
    let errors: any = {};
    let paramsOk: boolean = true;
    const bankAccount = props.bankAccounts.find((account: any) => {
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

    setTransactionState({ ...transactionState,errors });

    return paramsOk;
  };
  const newTransaction = () => {
    
    props.submitTransaction(
      transactionState.originAccountId,
      transactionState.destinationAccountId,
      transactionState.convertedAmount,
      transactionState.convertedCurrency,
      transactionState.comment,
    );
    history.push('/show_transaction');
  };
  const renderContent = () => {
    if (transactionState.showFormReview) {
      return (
        <TransactionFormReview
          {...transactionState}
          convertedAmount={transactionState.convertedAmount}
          backStep={changeStep}
          submitForm={newTransaction}
        />
      );
    }

    return (
      <TransactionForm
        onChangeComment={handleCommentValue}
        onChangeOrigin={handleOriginAccountIdValue}
        onChangeDestination={handleDestinationAccountIdValue}
        onChangeAmount={handleamountValue}
        nextStep={changeStep}
        bankAccounts={props.bankAccounts}
        {...transactionState}
      />
    );
  }
  return (
    <div>
      {!props.isAuthenticated ? (
        <Redirect to="/log_in" />
      ) : (
        <>
          <Navbar />
          {renderContent()}
        </>
      )}
    </div>
  );
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
