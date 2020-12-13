import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Colors } from '../config';
import HomePage from '../components/organisms/homePage';
import LoginPage from '../components/organisms/loginPage';
import WhoAreYou from '../components/organisms/whoAreYou';
import Modal from '../components/molecules/modal';
import EnterEmail from '../components/organisms/enterEmail';
import SignUpPerfomer from '../components/organisms/singUpPerformer';
import SignUpCustomer from '../components/organisms/singUpCustomer';

const Spoint = () => {
  // <<<<<<<<<<<<<< STATE VARIABLES >>>>>>>>>>>>>>>

  // Page
  const [page, setPage] = useState('home');
  // General User
  const [userInfo, setUserInfo] = useState({
    email: null,
    password: null,
  });
  // Performer
  const [performerInfo, setPerformerInfo] = useState({
    email: null,
    password: null,
    name: null,
    category: null,
    genre: null,
    cost_per_hour: null,
    profile_pic: {
      data: null,
      uploading: null,
      url: null,
    },
    birthday: null,
    search_city: null,
    address: null,
    fiscal_code: null,
  });
  const [performerRegistration, setPerformerRegistration] = useState({
    loading: false,
    success: false,
    error: false,
  });
  // Customer
  const [customerInfo, setCustomerInfo] = useState({
    email: null,
    password: null,
    name: null,
    profile_pic: {
      data: null,
      uploading: null,
      url: null,
    },
    address: null,
    fiscal_code: null,
  });
  const [customerRegistration, setCustomerRegistration] = useState({
    loading: false,
    success: false,
    error: false,
  });
  // Modals
  const [modalOpen, setModalOpen] = useState({
    welcomeBack: false,
  });

  // <<<<<<<<<<<<<<< METHODS >>>>>>>>>>>>>>>

  const editBirthdayString = (value) => {
    let v = value.replace(/\D/g, '').slice(0, 10);
    if (v.length >= 5) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
    } else if (v.length >= 3) {
      return `${v.slice(0, 2)}/${v.slice(2)}`;
    }
    return v;
  };

  // <<<<<<<<<<<<<<< RETURN FUNCTION >>>>>>>>>>>>>>>

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
          handleEmailTyped={(event) => {
            setUserInfo({ ...userInfo, email: event.target.value });
            console.log(userInfo);
          }}
          handleGoBackButtonClick={() => setPage('home')}
          emailValue={userInfo.email}
          passwordValue={userInfo.password}
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
          emailValue={userInfo.email}
          handleEmailTyped={(event) => setUserInfo({ ...userInfo, email: event.target.value })}
          handleSubmitEmail={() => setPage('who-are-you')}
          handleGoBackButtonClick={() => setPage('home')}
        />
      )}
      {page === 'who-are-you' && (
        <WhoAreYou
          handleCustomerSelected={() => {
            setCustomerInfo({ ...customerInfo, email: userInfo.email });
            setPage('sign-up-customer');
          }}
          handlePerformerSelected={() => {
            setPerformerInfo({ ...performerInfo, email: userInfo.email });
            setPage('sign-up-performer');
          }}
          handleGoBackButtonClick={() => setPage('enter-email')}
        />
      )}

      {/* ///////////// PERFORMER SIGN UP ///////////// */}

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
          profilePicValue={performerInfo.profile_pic}
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
          handleRemoveProfilePic={() => {
            setPerformerInfo({
              ...performerInfo,
              profile_pic: {
                data: null,
                uploading: null,
                url: null,
              },
            });
          }}
          handleUploadProfilePic={(event) => {
            const file = event.target.files[0];
            event.target.value = null;
            const profilePic = new FormData();
            profilePic.append('image', file);
            setPerformerInfo({
              ...performerInfo,
              profile_pic: {
                ...performerInfo.profile_pic,
                data: null,
                uploading: true,
              },
            });
            setTimeout(() => {
              setPerformerInfo({
                ...performerInfo,
                profile_pic: {
                  ...performerInfo.profile_pic,
                  data: profilePic,
                  uploading: false,
                  url: URL.createObjectURL(file),
                },
              });
              console.log(performerInfo);
            }, 2000);
          }}
          handleCloseSuccessModal={() => {
            setPage('home-performer');
            setPerformerRegistration({
              ...performerRegistration,
              success: false,
            });
          }}
          handleCloseErrorModal={() => {
            setPerformerRegistration({
              ...performerRegistration,
              error: false,
            });
          }}
          handleSubmitCustomerInfo={() => {
            setPerformerRegistration({
              ...performerRegistration,
              loading: true,
            });
            setTimeout(() => {
              setPerformerRegistration({
                ...performerRegistration,
                success: true,
                loading: false,
              });
            }, 2000);
          }}
          loading={performerRegistration.loading}
          success={performerRegistration.success}
          error={performerRegistration.error}
        />
      )}

      {/* ///////////// CUSTOMER SIGN UP ///////////// */}

      {page === 'sign-up-customer' && (
        <SignUpCustomer
          nameValue={customerInfo.name}
          passwordValue={customerInfo.password}
          addressValue={customerInfo.address}
          fiscalCodeValue={customerInfo.fiscal_code}
          birthdayValue={customerInfo.birthday}
          profilePicValue={customerInfo.profile_pic}
          handleGoBackButtonClick={() => setPage('who-are-you')}
          handleNameTyped={(event) => {
            const { value } = event.target;
            setCustomerInfo({
              ...customerInfo,
              name: value,
            });
            console.log(customerInfo);
          }}
          handlePasswordTyped={(event) => {
            const { value } = event.target;
            setCustomerInfo({
              ...customerInfo,
              password: value,
            });
            console.log(customerInfo);
          }}
          handleAdressTyped={(event) => {
            const { value } = event.target;
            setCustomerInfo({
              ...customerInfo,
              address: value,
            });
            console.log(customerInfo);
          }}
          handleFiscalCodeTyped={(event) => {
            const { value } = event.target;
            setCustomerInfo({
              ...customerInfo,
              fiscal_code: value,
            });
            console.log(customerInfo);
          }}
          handleBirthdayTyped={(event) => {
            const { value } = event.target;
            setCustomerInfo({
              ...customerInfo,
              birthday: editBirthdayString(value),
            });
            console.log(customerInfo);
          }}
          handleRemoveProfilePic={() => {
            setCustomerInfo({
              ...customerInfo,
              profile_pic: {
                data: null,
                uploading: null,
                url: null,
              },
            });
          }}
          handleUploadProfilePic={(event) => {
            const file = event.target.files[0];
            event.target.value = null;
            const profilePic = new FormData();
            profilePic.append('image', file);
            setCustomerInfo({
              ...customerInfo,
              profile_pic: {
                ...customerInfo.profile_pic,
                data: null,
                uploading: true,
              },
            });
            setTimeout(() => {
              setCustomerInfo({
                ...customerInfo,
                profile_pic: {
                  ...customerInfo.profile_pic,
                  data: profilePic,
                  uploading: false,
                  url: URL.createObjectURL(file),
                },
              });
              console.log(customerInfo);
            }, 2000);
          }}
          handleCloseSuccessModal={() => {
            setPage('home-customer');
            setCustomerRegistration({
              ...customerRegistration,
              success: false,
            });
          }}
          handleCloseErrorModal={() => {
            setCustomerRegistration({
              ...customerRegistration,
              error: false,
            });
          }}
          handleSubmitCustomerInfo={() => {
            setCustomerRegistration({
              ...customerRegistration,
              loading: true,
            });
            setTimeout(() => {
              setCustomerRegistration({
                ...customerRegistration,
                success: true,
                loading: false,
              });
            }, 2000);
          }}
          loading={customerRegistration.loading}
          success={customerRegistration.success}
          error={customerRegistration.error}
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
