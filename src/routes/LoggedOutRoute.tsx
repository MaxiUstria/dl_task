import * as React from 'react';
import { Route } from 'react-router-dom';
interface IProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}
const LoggedOutRoute = ({ component: Component, ...otherProps }: IProps) => (
  <>
    <Route
      render={(otherProps) => (
        <>
          <Component {...otherProps} />
        </>
      )}
    />
  </>
);
export default LoggedOutRoute;
