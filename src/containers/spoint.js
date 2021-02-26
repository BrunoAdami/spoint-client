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
import AppCustomer from '../components/organisms/appCustomer';
import AppPerformer from '../components/organisms/appPerformer';
import Api from '../services/api';
import { OFFERS } from '../mock-data';
import ReactS3Client from '../services/s3';
import rand from 'random-key';

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
      uploading: null,
      url: null,
    },
    birthday: null,
    search_city: null,
    address: null,
    fiscal_code: null,
    profile_pic_url: null,
  });
  const [performerRegistration, setPerformerRegistration] = useState({
    loading: false,
    success: false,
    error: false,
  });
  const [loggedPerformer, setLoggedPerformer] = useState({
    id: null,
    email: null,
    password: null,
    name: null,
    category: null,
    genre: null,
    cost_per_hour: null,
    profile_pic_url: null,
    birthday: null,
    score: null,
    search_city: null,
    address: null,
    fiscal_code: null,
    money: null,
    jobs: null,
  });
  // Customer
  const [customerInfo, setCustomerInfo] = useState({
    email: null,
    password: null,
    name: null,
    profile_pic: {
      uploading: null,
      url: null,
    },
    address: null,
    fiscal_code: null,
    profile_pic_url: null,
  });
  const [customerRegistration, setCustomerRegistration] = useState({
    loading: false,
    success: false,
    error: false,
  });
  const [loggedCustomer, setLoggedCustomer] = useState({
    id: null,
    email: null,
    password: null,
    name: null,
    profile_pic_url: null,
    score: null,
    address: null,
    fiscal_code: null,
    jobs: null,
  });
  // Login
  const [loginLoading, setLoginLoading] = useState(false);
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

  const handleSubmitCustomerInfo = async () => {
    setCustomerRegistration({
      ...customerRegistration,
      loading: true,
    });
    console.log(customerInfo);
    console.log(customerInfo.profile_pic_url);
    const customerObject = {
      email: customerInfo.email,
      password: customerInfo.password,
      name: customerInfo.name,
      profile_pic_url: customerInfo.profile_pic_url,
      address: customerInfo.address,
      fiscal_code: customerInfo.fiscal_code,
      role: 'Customer',
    };
    console.log(customerObject);

    Api.post('/user/', customerObject)
      .then((response) => {
        setCustomerRegistration({
          ...customerRegistration,
          success: true,
          loading: false,
        });
        console.log(response.data);
      })
      .catch((err) => {
        setCustomerRegistration({
          ...customerRegistration,
          loading: false,
          error: true,
        });
        console.error(err);
      });
  };

  const handleSubmitPerformerInfo = () => {
    setPerformerRegistration({
      ...performerRegistration,
      loading: true,
    });

    const performerObject = {
      email: performerInfo.email,
      password: performerInfo.password,
      name: performerInfo.name,
      category: performerInfo.category.value,
      cost_per_hour: performerInfo.cost_per_hour,
      profile_pic_url: performerInfo.profile_pic_url,
      birthday: `${performerInfo.birthday.split('/')[0]}-${performerInfo.birthday.split('/')[1]}-${
        performerInfo.birthday.split('/')[2]
      }`,
      search_city: performerInfo.search_city.value,
      address: performerInfo.address,
      fiscal_code: performerInfo.fiscal_code,
      role: 'Performer',
    };
    if (performerInfo.genre) performerObject['genre'] = performerInfo.genre.value;
    console.log(performerObject);
    Api.post('/user/', performerObject)
      .then((response) => {
        setPerformerRegistration({
          ...performerRegistration,
          success: true,
          loading: false,
        });
        console.log(response.data);
      })
      .catch((err) => {
        setPerformerRegistration({
          ...performerRegistration,
          loading: false,
          error: true,
        });
        console.error(err);
      });
  };

  const handleUpdateJobsCustomer = async () => {
    const userData = {
      email: loggedCustomer.email,
      password: loggedCustomer.password,
    };

    Api.post('/login/', userData)
      .then((response) => {
        const { user } = response.data;
        console.log(user);
        setLoggedCustomer({
          ...loggedCustomer,
          ...user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateJobsPerformer = async () => {
    const userData = {
      email: loggedPerformer.email,
      password: loggedPerformer.password,
    };

    Api.post('/login/', userData)
      .then((response) => {
        const { user } = response.data;
        console.log(user);
        setLoggedPerformer({
          ...loggedPerformer,
          ...user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitLogin = async () => {
    const userData = {
      email: userInfo.email,
      password: userInfo.password,
    };

    setLoginLoading(true);
    Api.post('/login/', userData)
      .then((response) => {
        const { user } = response.data;
        console.log(user);
        setModalOpen({
          ...modalOpen,
          welcomeBack: true,
        });
        if (user.category) {
          setLoggedPerformer({
            email: userInfo.email,
            password: userInfo.password,
            ...user,
          });
          setPage('performer');
        } else {
          setLoggedCustomer({
            email: userInfo.email,
            password: userInfo.password,
            ...user,
          });
          setPage('customer');
        }
        setLoginLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoginLoading(false);
      });
  };

  const handleUploadPerformerProfilePic = async (event) => {
    const file = event.target.files[0];
    let profilePicUrl;
    try {
      const response = await ReactS3Client.uploadFile(file, rand.generate());
      profilePicUrl = response.location;
    } catch (err) {
      console.error(err);
    }
    event.target.value = null;
    setPerformerInfo({
      ...performerInfo,
      profile_pic: {
        ...performerInfo.profile_pic,
        uploading: true,
      },
    });
    setTimeout(() => {
      setPerformerInfo({
        ...performerInfo,
        profile_pic_url: profilePicUrl,
        profile_pic: {
          ...performerInfo.profile_pic,
          uploading: false,
          url: URL.createObjectURL(file),
        },
      });
    }, 2000);
  };

  const handleUploadCustomerProfilePic = async (event) => {
    const file = event.target.files[0];
    let profilePicUrl;
    try {
      const response = await ReactS3Client.uploadFile(file, rand.generate());
      profilePicUrl = response.location;
      console.log(profilePicUrl);
    } catch (err) {
      console.error(err);
    }
    setCustomerInfo({
      ...customerInfo,
      profile_pic: {
        ...customerInfo.profile_pic,
        uploading: true,
      },
    });
    setTimeout(() => {
      setCustomerInfo({
        ...customerInfo,
        profile_pic_url: profilePicUrl,
        profile_pic: {
          ...customerInfo.profile_pic,
          uploading: false,
          url: URL.createObjectURL(file),
        },
      });
    }, 2000);
  };

  // <<<<<<<<<<<<<<< RETURN FUNCTION >>>>>>>>>>>>>>>

  return (
    <div style={backgroundStyles}>
      {/* <<<<<<<<<<<<< HOME PAGE >>>>>>>>>>>>>>> */}

      {page === 'home' && (
        <HomePage
          handleLoginButtonClick={async () => {
            Api.get('').then((response) => console.log(response));
            setPage('login');
          }}
          handleSignUpButtonClick={() => setPage('enter-email')}
          handleDidntReceiveEmailClick={() => console.log('click')}
        />
      )}

      {/* <<<<<<<<<<<< LOGIN FLOW >>>>>>>>>>>>>>> */}

      {page === 'login' && (
        <LoginPage
          handleForgotPassword={() => console.log('click')}
          handleSubmitLogin={handleSubmitLogin}
          handlePasswordTyped={(event) => {
            setUserInfo({ ...userInfo, password: event.target.value });
          }}
          handleEmailTyped={(event) => {
            setUserInfo({ ...userInfo, email: event.target.value });
          }}
          handleGoBackButtonClick={() => setPage('home')}
          emailValue={userInfo.email}
          passwordValue={userInfo.password}
          loading={loginLoading}
        />
      )}
      {/* Welcome back */}
      {modalOpen.welcomeBack && (
        <Modal
          title={'WELCOME BACK'}
          subTitle={'WE ARE HAPPY TO SEE YOU AGAIN'}
          handleCloseButton={() =>
            setModalOpen({
              ...modalOpen,
              welcomeBack: false,
            })
          }
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
          }}
          handlePasswordTyped={(event) => {
            const { value } = event.target;
            setPerformerInfo({
              ...performerInfo,
              password: value,
            });
          }}
          handleCategorySelected={(event, newValue) => {
            setPerformerInfo({
              ...performerInfo,
              category: newValue ? newValue : null,
            });
          }}
          handleGenreSelected={(event, newValue) => {
            setPerformerInfo({
              ...performerInfo,
              genre: newValue ? newValue : null,
            });
          }}
          handleAdressTyped={(event) => {
            const { value } = event.target;
            setPerformerInfo({
              ...performerInfo,
              address: value,
            });
          }}
          handleSearchCitySelected={(event, newValue) => {
            setPerformerInfo({
              ...performerInfo,
              search_city: newValue ? newValue : null,
            });
          }}
          handleFiscalCodeTyped={(event) => {
            const { value } = event.target;
            setPerformerInfo({
              ...performerInfo,
              fiscal_code: value,
            });
          }}
          handleCostPerHourTyped={(event) => {
            const { value } = event.target;
            setPerformerInfo({
              ...performerInfo,
              cost_per_hour: value,
            });
          }}
          handleBirthdayTyped={(event) => {
            const { value } = event.target;
            setPerformerInfo({
              ...performerInfo,
              birthday: editBirthdayString(value),
            });
          }}
          handleRemoveProfilePic={() => {
            setPerformerInfo({
              ...performerInfo,
              profile_pic: {
                uploading: null,
                url: null,
              },
            });
          }}
          handleUploadProfilePic={handleUploadPerformerProfilePic}
          handleCloseSuccessModal={() => {
            setPage('home');
            setPerformerRegistration({
              ...performerRegistration,
              success: false,
            });
            setPerformerInfo({
              email: null,
              password: null,
              name: null,
              category: null,
              genre: null,
              cost_per_hour: null,
              profile_pic: {
                uploading: null,
                url: null,
              },
              birthday: null,
              search_city: null,
              address: null,
              fiscal_code: null,
              profile_pic_url: null,
            });
          }}
          handleCloseErrorModal={() => {
            setPerformerRegistration({
              ...performerRegistration,
              error: false,
            });
          }}
          handleSubmitPerformerInfo={handleSubmitPerformerInfo}
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
          }}
          handlePasswordTyped={(event) => {
            const { value } = event.target;
            setCustomerInfo({
              ...customerInfo,
              password: value,
            });
          }}
          handleAdressTyped={(event) => {
            const { value } = event.target;
            setCustomerInfo({
              ...customerInfo,
              address: value,
            });
          }}
          handleFiscalCodeTyped={(event) => {
            const { value } = event.target;
            setCustomerInfo({
              ...customerInfo,
              fiscal_code: value,
            });
          }}
          handleBirthdayTyped={(event) => {
            const { value } = event.target;
            setCustomerInfo({
              ...customerInfo,
              birthday: editBirthdayString(value),
            });
          }}
          handleRemoveProfilePic={() => {
            setCustomerInfo({
              ...customerInfo,
              profile_pic: {
                uploading: null,
                url: null,
              },
            });
          }}
          handleUploadProfilePic={handleUploadCustomerProfilePic}
          handleCloseSuccessModal={() => {
            setPage('home');
            setCustomerRegistration({
              ...customerRegistration,
              success: false,
            });
            setCustomerInfo({
              email: null,
              password: null,
              name: null,
              profile_pic: {
                uploading: null,
                url: null,
              },
              address: null,
              fiscal_code: null,
              profile_pic_url: null,
            });
          }}
          handleCloseErrorModal={() => {
            setCustomerRegistration({
              ...customerRegistration,
              error: false,
            });
          }}
          handleSubmitCustomerInfo={handleSubmitCustomerInfo}
          loading={customerRegistration.loading}
          success={customerRegistration.success}
          error={customerRegistration.error}
        />
      )}

      {/* <<<<<<<<<<<<< CUSTOMER APP >>>>>>>>>>>>>> */}
      {page === 'customer' && (
        <AppCustomer
          id={loggedCustomer.id}
          email={loggedCustomer.email}
          password={loggedCustomer.password}
          name={loggedCustomer.name}
          profile_pic_url={loggedCustomer.profile_pic_url}
          score={loggedCustomer.score}
          address={loggedCustomer.address}
          fiscal_code={loggedCustomer.fiscal_code}
          jobs={loggedCustomer.jobs}
          handleLogout={() => {
            setPage('home');
          }}
          updateJobs={handleUpdateJobsCustomer}
        />
      )}

      {/* <<<<<<<<<<<<< PERFORMER APP >>>>>>>>>>>>>> */}
      {page === 'performer' && (
        <AppPerformer
          id={loggedPerformer.id}
          email={loggedPerformer.email}
          password={loggedPerformer.password}
          name={loggedPerformer.name}
          category={loggedPerformer.category}
          genre={loggedPerformer.genre}
          cost_per_hour={loggedPerformer.cost_per_hour}
          profile_pic_url={loggedPerformer.profile_pic_url}
          birthday={loggedPerformer.birthday}
          score={loggedPerformer.score}
          search_city={loggedPerformer.search_city}
          address={loggedPerformer.address}
          fiscal_code={loggedPerformer.fiscal_code}
          money={loggedPerformer.money}
          jobs={loggedPerformer.jobs}
          handleLogout={() => {
            setPage('home');
          }}
          updateJobs={handleUpdateJobsPerformer}
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
