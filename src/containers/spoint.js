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
  const [page, setPage] = useState('sign-up-performer');
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const [performerInfo, setPerformerInfo] = useState({
    email: null,
    password: null,
    name: null,
    category: null,
    genre: null,
    cost_per_hour: null,
    profile_pic: null,
    birthday: null,
    search_city: null,
    address: null,
    fiscal_code: null,
  });
  const [customerInfo, setCustomerInfo] = useState({
    email: null,
    password: null,
    name: null,
    profile_pic: null,
    address: null,
    fiscal_code: null,
  });
  const [modalOpen, setModalOpen] = useState({
    welcomeBack: false,
  });
  // METHODS
  const editBirthdayString = (value) => {
    let v = value.replace(/\D/g, '').slice(0, 10);
    if (v.length >= 5) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
    } else if (v.length >= 3) {
      return `${v.slice(0, 2)}/${v.slice(2)}`;
    }
    return v;
  };
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
            setPage('sign-up-customer');
          }}
          handlePerformerSelected={() => {
            setPage('sign-up-performer');
          }}
          handleGoBackButtonClick={() => setPage('enter-email')}
        />
      )}
      {page === 'sign-up-performer' && (
        <SignUpPerfomer
          nameValue={performerInfo.name}
          passwordValue={performerInfo.password}
          categoryValue={performerInfo.category}
          genreValue={performerInfo.genre}
          addressValue={performerInfo.address}
          searchCityValue={performerInfo.search_city}
          fiscalCodeValue={performerInfo.fiscal_code}
          costPerHourValue={performerInfo.cost_per_hour}
          birthdayValue={performerInfo.birthday}
          handleGoBackButtonClick={() => setPage('who-are-you')}
          handleNameTyped={(event) => {
            const { value } = event.target;
            setPerformerInfo({
              ...performerInfo,
              name: value,
            });
            console.log(performerInfo);
          }}
          handlePasswordTyped={(event) => {
            const { value } = event.target;
            setPerformerInfo({
              ...performerInfo,
              password: value,
            });
            console.log(performerInfo);
          }}
          handleCategorySelected={(event, newValue) => {
            setPerformerInfo({
              ...performerInfo,
              category: newValue ? newValue : null,
            });
            console.log(performerInfo);
          }}
          handleGenreSelected={(event, newValue) => {
            setPerformerInfo({
              ...performerInfo,
              genre: newValue ? newValue : null,
            });
            console.log(performerInfo);
          }}
          handleAdressTyped={(event) => {
            const { value } = event.target;
            setPerformerInfo({
              ...performerInfo,
              address: value,
            });
            console.log(performerInfo);
          }}
          handleSearchCitySelected={(event, newValue) => {
            setPerformerInfo({
              ...performerInfo,
              search_city: newValue ? newValue : null,
            });
            console.log(performerInfo);
          }}
          handleFiscalCodeTyped={(event) => {
            const { value } = event.target;
            setPerformerInfo({
              ...performerInfo,
              fiscal_code: value,
            });
            console.log(performerInfo);
          }}
          handleCostPerHourTyped={(event) => {
            const { value } = event.target;
            setPerformerInfo({
              ...performerInfo,
              cost_per_hour: value,
            });
            console.log(performerInfo);
          }}
          handleBirthdayTyped={(event) => {
            const { value } = event.target;
            setPerformerInfo({
              ...performerInfo,
              birthday: editBirthdayString(value),
            });
            console.log(performerInfo);
          }}
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
