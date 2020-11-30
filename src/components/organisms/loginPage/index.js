import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/loginButton';
import GoBackHeader from '../../molecules/goBackHeader';
import Input from '../../atoms/input';

const LoginPage = (props) => {
  return (
    <div style={{ height: '100%' }}>
      <GoBackHeader style={{ position: 'absolute', top: 0 }} handleGoBackButtonClick={props.handleGoBackButtonClick} />
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
          <text style={{ fontSize: 'xx-large', fontWeight: 'bold', marginBottom: '20px' }}>FILL YOUR INFORMATIONS</text>
          <Input handleInputTyped={props.handleUsernameTyped} placeholder="USERNAME" />
          <Input style={{ marginTop: '20px' }} handleInputTyped={props.handlePasswordTyped} placeholder="PASSWORD" />
          <Button style={{ marginTop: '20px', width: '100%' }} onClick={props.handleSubmitLogin}>
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
    </div>
  );
};

const { func } = PropTypes;

LoginPage.propTypes = {
  handleUsernameTyped: func.isRequired,
  handlePasswordTyped: func.isRequired,
  handleSubmitLogin: func.isRequired,
  handleForgotPassword: func.isRequired,
  handleGoBackButtonClick: func.isRequired,
};

export default LoginPage;
