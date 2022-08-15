import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

import LoginForm from '../../components/login-form/login-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import './login.styles.scss';

const LoginPage = () => {
  const [currentPage, setCurrentPage] = useState((<LoginForm />));
  const [newUser, setNewUser] = useState(false);
  const [btnName, setBtnName] = useState('Sign Up');

  useEffect(() => {
    if(newUser) {
      setBtnName('Back');
      setCurrentPage(<SignUpForm signUp={() => setNewUser(!newUser)} />);
    }
    if(!newUser) {
      setBtnName('Sign Up');
      setCurrentPage(<LoginForm signUp={() => setNewUser(!newUser)} />);
    }
  }, [ newUser ]);

  return (
    <div className='container'>
      {currentPage}
    </div>
  )
}
  


export default LoginPage;