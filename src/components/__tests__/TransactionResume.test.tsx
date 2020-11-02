import React from 'react';
import TransactionResume from '../transactions/TransactionResume';
import { shallow } from 'enzyme';
import { Transaction } from '../../types';

function renderTransactionResume() {
  const transaction: Transaction = {
    id: 1,
    origin: '1',
    destination: '2',
    amount: 1,
    exchangeInfo: 'USD-USD/1',
    currency: 'USD',
    comment: 'enzyme',
  };
  const props = { transaction };
  return shallow(<TransactionResume {...props} />);
}

it('renders transaction info', () => {
  const wrapper = renderTransactionResume();

  expect(wrapper.find('#origin').length).toBe(1);
  expect(wrapper.find('#destination').length).toBe(1);
  expect(wrapper.find('#amount').length).toBe(1);
  expect(wrapper.find('#currency').length).toBe(1);
  expect(wrapper.find('#exchange').length).toBe(1);
  expect(wrapper.find('#comment').length).toBe(1);

  expect(wrapper.find('#origin').text()).toBe('Origin Account: 1');
  expect(wrapper.find('#destination').text()).toBe('Destination Account: 2');
  expect(wrapper.find('#amount').text()).toBe('Amount: 1');
  expect(wrapper.find('#currency').text()).toBe('Currency: USD');
  expect(wrapper.find('#exchange').text()).toBe('Exchange Info: USD-USD/1');
  expect(wrapper.find('#comment').text()).toBe('Comment: enzyme');
});
