import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Colors } from '../config';
import HomePage from '../components/organisms/homePage';
import LoginPage from '../components/organisms/loginPage';

const Spoint = () => {
  // STATE VARIABLES
  const [page, setPage] = useState('home');
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
  });
  // RETURN FUCTION
  return (
    <div style={backgroundStyles}>
      {page === 'home' && (
        <HomePage
          handleLoginButtonClick={() => setPage('login')}
          handleSignUpButtonClick={() => setPage('sign up')}
          handleDidntReceiveEmailClick={() => console.log('click')}
        />
      )}
      {page === 'login' && (
        <LoginPage
          handleForgotPassword={() => console.log('click')}
          handleSubmitLogin={() => console.log('submit')}
          handlePasswordTyped={(event) => {
            setUserInfo({ ...userInfo, password: event.target.value });
            console.log(userInfo);
          }}
          handleUsernameTyped={(event) => {
            setUserInfo({ ...userInfo, username: event.target.value });
            console.log(userInfo);
          }}
          handleGoBackButtonClick={() => setPage('home')}
        />
      )}
    </div>
  );
};

const { string } = PropTypes;

Spoint.propTypes = {
  name: string.isRequired,
};

const backgroundStyles = {
  backgroundColor: Colors.SECONDARY,
  height: '100vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
};

export default Spoint;
