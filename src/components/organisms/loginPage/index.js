import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/loginButton';
import GoBackHeader from '../../molecules/goBackHeader';
import Input from '../../atoms/input';
import Loader from '../../atoms/loader';

const LoginPage = (props) => {
  return (
    <div style={{ height: '100%' }}>
      <GoBackHeader style={{ position: 'absolute', top: 0 }} handleGoBackButtonClick={props.handleGoBackButtonClick} />
      {!props.loading && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              width: '75%',
              marginBottom: '200px',
            }}
          >
            <text style={{ fontSize: 'xx-large', fontWeight: 'bold', marginBottom: '20px' }}>
              FILL YOUR INFORMATIONS
            </text>
            <Input handleInputTyped={props.handleEmailTyped} placeholder="EMAIL" value={props.emailValue} />
            <Input
              style={{ marginTop: '20px' }}
              handleInputTyped={props.handlePasswordTyped}
              placeholder="PASSWORD"
              value={props.passwordValue}
              type="password"
            />
            <Button
              style={{ marginTop: '20px', width: '100%' }}
              onClick={props.handleSubmitLogin}
              disabled={props.passwordValue && props.emailValue ? false : true}
            >
              SUBMIT
            </Button>
            <text
              onClick={props.handleForgotPassword}
              style={{
                marginTop: '20px',
                color: 'white',
                textDecoration: 'underline',
                fontStyle: 'italic',
                cursor: 'pointer',
              }}
            >
              Forgot the password?
            </text>
          </div>
        </div>
      )}
      {/* <<<<<<<<<<<<<<< LOADING SCREEN >>>>>>>>>>>>>> */}
      {props.loading && (
        <div
          style={{
            display: 'flex',
            height: '78%',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <Loader style={{ height: '48px', margin: '20px' }} />
            <text style={{ fontSize: 'xx-large', fontWeight: 'bold' }}>{'LOADING...'}</text>
          </div>
        </div>
      )}
    </div>
  );
};

const { func, any } = PropTypes;

LoginPage.propTypes = {
  handleEmailTyped: func.isRequired,
  handlePasswordTyped: func.isRequired,
  handleSubmitLogin: func.isRequired,
  handleForgotPassword: func.isRequired,
  handleGoBackButtonClick: func.isRequired,
  emailValue: any.isRequired,
  passwordValue: any.isRequired,
};

export default LoginPage;
