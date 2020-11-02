import * as React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../../assets/images/PageNotFound.png';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img alt="error-404" src={PageNotFound} />
      <p>
        <Link to="/">Go to Home </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
