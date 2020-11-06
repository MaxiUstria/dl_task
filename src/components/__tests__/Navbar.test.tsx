import React from 'react';
import { render } from 'enzyme';
import { User } from '../../types';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import currentReducer from '../../redux/reducers/userReducers';

import { Provider } from 'react-redux';
import Navbar from '../commons/Navbar';

function renderNavbar() {
  const user: User = {
    id: 1,
    username: 'test',
    password: 'test',
    name: 'John',
    surname: 'doe',
  };

  const initialState = {
    user: user,
    isAuthenticated: true,
  };

  const store = createStore<any, any, any, any>(currentReducer, initialState);

  const props = { user };
  return render(
    <Provider store={store}>
      <Router>
        <Navbar {...props} />
      </Router>
    </Provider>,
  );
}

it('renders user name on navbar', () => {
  const wrapper = renderNavbar();

  expect(wrapper.find('.MuiTypography-root').length).toBe(1);
  expect(wrapper.find('.MuiTypography-root').text()).toBe('Welcome, John');
});

it('contains all 5 buttons', () => {
  const wrapper = renderNavbar();

  expect(wrapper.find('.MuiButtonBase-root').length).toBe(5);
});
