import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Colors } from '../config';
import HomePage from '../components/organisms/homePage';
import LoginPage from '../components/organisms/loginPage';
import WhoAreYou from '../components/organisms/whoAreYou';
import Modal from '../components/molecules/modal';
import EnterEmail from '../components/organisms/enterEmail';
import SignUpPerfomer from '../components/organisms/singUpPerformer';

const Spoint = () => {
  // STATE VARIABLES
  const [page, setPage] = useState('edit');
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    email: '',
    performerInfo: null,
    customerInfo: null,
  });
  const [modalOpen, setModalOpen] = useState({
    welcomeBack: false,
  });
  // RETURN FUCTION
  return (
    <div style={backgroundStyles}>
      {/* <<<<<<<<<<<<< HOME PAGE >>>>>>>>>>>>>>> */}

      {page === 'home' && (
        <HomePage
          handleLoginButtonClick={() => setPage('login')}
          handleSignUpButtonClick={() => setPage('enter-email')}
          handleDidntReceiveEmailClick={() => console.log('click')}
        />
      )}

      {/* <<<<<<<<<<<< LOGIN FLOW >>>>>>>>>>>>>>> */}

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
      {/* Welcome back */}
      {modalOpen.welcomeBack && (
        <Modal
          title={'WELCOME BACK'}
          subTitle={'WE ARE HAPPY TO SEE YOU AGAIN'}
          handleCloseButton={() => console.log('close the modal')}
        />
      )}

      {/* <<<<<<<<<<<<<< SIGN UP FLOW >>>>>>>>>>>>> */}

      {page === 'enter-email' && (
        <EnterEmail
          handleEmailTyped={(event) => setUserInfo({ ...userInfo, email: event.target.value })}
          handleSubmitEmail={() => setPage('who-are-you')}
          handleGoBackButtonClick={() => setPage('home')}
        />
      )}
      {page === 'who-are-you' && (
        <WhoAreYou
          handleCustomerSelected={() => {
            setUserInfo({ ...userInfo, customerInfo: { username: '', password: '' } });
            setPage('sign-up-performer-1');
          }}
          handlePerformerSelected={() => {
            setUserInfo({ ...userInfo, performerInfo: { username: '', password: '' } });
            setPage('sign-up-customer-1');
          }}
          handleGoBackButtonClick={() => setPage('home')}
        />
      )}
      {page === 'edit' && <SignUpPerfomer />}
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
