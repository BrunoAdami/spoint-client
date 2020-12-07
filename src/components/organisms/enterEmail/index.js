import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/loginButton';
import GoBackHeader from '../../molecules/goBackHeader';
import Input from '../../atoms/input';

const EnterEmail = (props) => {
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
          <text style={{ fontSize: 'xx-large', fontWeight: 'bold', marginBottom: '20px' }}>ENTER YOUR EMAIL</text>
          <Input handleInputTyped={props.handleEmailTyped} placeholder="EMAIL" />
          <Button style={{ marginTop: '40px', width: '100%' }} onClick={props.handleSubmitEmail}>
            CONTINUE
          </Button>
        </div>
      </div>
    </div>
  );
};

const { func } = PropTypes;

EnterEmail.propTypes = {
  handleEmailTyped: func.isRequired,
  handleSubmitEmail: func.isRequired,
  handleGoBackButtonClick: func.isRequired,
};

export default EnterEmail;
