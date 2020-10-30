import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { findAccount, calculateAmount, createTransaction, getAccounts } from '../../back/dataApi';
import { toast } from 'react-toastify';

import TransactionFormReview from './TransactionFormReview';
import TransactionForm from './TransactionForm';
import Navbar from '../commons/Navbar';
import { connect } from 'react-redux';
import {
  ICurrent,
  BankAccount,
  BankAccounts,
  Transaction,
  Errors,
  User,
} from '../../types';
import TransactionResume from './TransactionResume';

export interface TransactionNewProps {
  isAuthenticated?: boolean | null;
  user?: User | null;
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
  showTransaction: boolean;
  originAccountId: string;
  destinationAccountId: string;
  amount: string;
  convertedAmount: string;
  convertedCurrency: string;
  comment: string;
  errors: Errors;
  destinationAccount: BankAccount | {};
  transaction: Transaction;
  bankAccounts: BankAccounts;
  exchangeInfo: string;
}

const TransactionNew = (props: TransactionNewProps) => {
  const [transactionState, setTransactionState] = useState<TransactionNewState>(
    {
      showFormReview: false,
      showTransaction: false,
      originAccountId: '',
      destinationAccountId: '',
      amount: '',
      convertedAmount: '',
      convertedCurrency: '',
      comment: '',
      errors: { destination: '', origin: '', amount: '' },
      destinationAccount: {},
      transaction: {} as Transaction,
      bankAccounts: [],
      exchangeInfo: '',
    },
  );
  useEffect(() => {
    const { user } = props;
    if (!transactionState.bankAccounts || transactionState.bankAccounts.length === 0) {
      if (user) {
        getAccounts(user.id).then((bankAccounts: BankAccounts) => {
          setTransactionState({ ...transactionState, bankAccounts });
        });
      }
    }
  }, []);
  const handleCommentValue = (comment: string) => {
    setTransactionState({ ...transactionState, comment });
  };
  const handleOriginAccountIdValue = (originAccountId: string) => {
    setTransactionState({ ...transactionState, originAccountId });
  };
  const handleDestinationAccountIdValue = (destinationAccountId: string) => {
    findAccount(destinationAccountId)
    .then(destinationAccount => {
      if (destinationAccount)   {
        const convertedCurrency = destinationAccount.currency;
        setTransactionState({ ...transactionState, destinationAccountId, destinationAccount, convertedCurrency });
      } else{
        setTransactionState({ ...transactionState, destinationAccountId, destinationAccount: {} })
      }
    });
  };
  const handleamountValue = (amount: string) => {
    setTransactionState({ ...transactionState, amount });
  };
  const changeStep = () => {
    let paramsOk: boolean = true;
    if (!transactionState.showFormReview) {
      paramsOk = validateForm();
      if (paramsOk){
        calculateAmount(
          transactionState.originAccountId,
          transactionState.destinationAccountId,
          transactionState.amount,
        ).then(([convertedAmount, exchangeInfo]) => {
          setTransactionState({
            ...transactionState,
            showFormReview: !transactionState.showFormReview,
            convertedAmount: convertedAmount,
            exchangeInfo,
          });
        });
      }
    } else if (paramsOk) {
      setTransactionState({ ...transactionState, showFormReview: !transactionState.showFormReview });
    }

    
  };
  const validateForm = () => {
    const { destinationAccountId, originAccountId, amount, destinationAccount, bankAccounts } = transactionState;
    let errors: Errors = { destination: '', origin: '', amount: '' };
    let paramsOk: boolean = true;
    const bankAccount = bankAccounts.find((account: BankAccount) => {
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
    
    createTransaction(
      transactionState.originAccountId,
      transactionState.destinationAccountId,
      transactionState.convertedAmount,
      transactionState.convertedCurrency,
      transactionState.comment,
      transactionState.exchangeInfo,
    ).then((transaction) => {
      toast.success('Transaction created');
      setTransactionState({
        ...transactionState,
        showTransaction: true,
        transaction,
      });
    });
  };
  const renderContent = () => {
    if (transactionState.showTransaction){
      return (
        <TransactionResume
          transaction={transactionState.transaction}
        />
      );
    }
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
    isAuthenticated: state.isAuthenticated,
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(TransactionNew);
