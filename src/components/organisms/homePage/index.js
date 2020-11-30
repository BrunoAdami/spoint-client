import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../../atoms/logo';
import Button from '../../atoms/loginButton';

const HomePage = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        alignItems: 'center',
      }}
    >
      <Logo style={{ width: '70vw', maxWidth: '500px' }} />
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Button onClick={props.handleLoginButtonClick} style={{ marginTop: '120px' }}>
          LOGIN
        </Button>
        <Button onClick={props.handleSignUpButtonClick} style={{ marginTop: '20px' }}>
          SIGN UP
        </Button>
        <text
          onClick={props.handleDidntReceiveEmailClick}
          style={{
            marginTop: '20px',
            color: 'white',
            textDecoration: 'underline',
            fontStyle: 'italic',
            cursor: 'pointer',
          }}
        >
          Didn't receive the email?
        </text>
      </div>
      <text style={{ color: 'gray', position: 'absolute', bottom: '15px' }}>Spoint 2020</text>
    </div>
  );
};

const { func } = PropTypes;

HomePage.propTypes = {
  handleLoginButtonClick: func.isRequired,
  handleSignUpButtonClick: func.isRequired,
  handleDidntReceiveEmailClick: func.isRequired,
};

export default HomePage;
