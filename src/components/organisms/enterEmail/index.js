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
          height: '90%',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            width: '75%',
            marginBottom: '100px',
          }}
        >
          <text style={{ fontSize: 'xx-large', fontWeight: 'bold', marginBottom: '20px' }}>ENTER YOUR EMAIL</text>
          <Input handleInputTyped={props.handleEmailTyped} placeholder="EMAIL" value={props.emailValue} />
          <Button
            style={{ marginTop: '40px', width: '100%' }}
            onClick={props.handleSubmitEmail}
            disabled={props.emailValue ? false : true}
          >
            CONTINUE
          </Button>
        </div>
      </div>
    </div>
  );
};

const { any, func } = PropTypes;

EnterEmail.propTypes = {
  emailValue: any.isRequired,
  handleEmailTyped: func.isRequired,
  handleSubmitEmail: func.isRequired,
  handleGoBackButtonClick: func.isRequired,
};

export default EnterEmail;
