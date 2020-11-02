import React from 'react';
import { render } from 'enzyme';
import { User } from '../../types';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import currentReducer from '../../redux/reducers/userReducers';

import { Provider } from 'react-redux';
import Home from '../commons/Home';

function renderHome(logged: boolean = true) {
  let isAuthenticated: boolean = false;
  let user: User | null = null;
  if (logged) {
    user = {
      id: 1,
      username: 'test',
      password: 'test',
      name: 'John',
      surname: 'doe',
    };

    isAuthenticated = true;
  }

  const initialState = {
    user,
    isAuthenticated,
  };

  const store = createStore<any, any, any, any>(currentReducer, initialState);

  const props = { user, isAuthenticated };
  return render(
    <Provider store={store}>
      <Router>
        <Home {...props} />
      </Router>
    </Provider>,
  );
}

it('if logged in should render bankAccount index', () => {
  const wrapper = renderHome();

  expect(wrapper.children().find('.MuiTypography-root').length).toBe(1);
  expect(wrapper.children().find('.MuiTypography-root').text()).toBe(
    'Welcome, John',
  );

  expect(wrapper.find('.MuiButtonBase-root').length).toBe(4);
});

it('if not logged in should render log in page', () => {
  const wrapper = renderHome(false);

  expect(wrapper.children().find('label').first().text()).toBe('Username');
  expect(wrapper.children().find('label').last().text()).toBe('password');
});
