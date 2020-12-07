import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/loginButton';
import GoBackHeader from '../../molecules/goBackHeader';
import Input from '../../atoms/input';
import DropDown from '../../atoms/dropDown';

const SignUpPerformer = (props) => {
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
          <text style={{ fontSize: 'large', fontWeight: 'bold', marginBottom: '20px' }}>FILL ALL THE FIELDS</text>
          <Input handleInputTyped={props.handleEmailTyped} placeholder="FIRST NAME" />
          <Input handleInputTyped={props.handleEmailTyped} placeholder="LAST NAME" />
          <Input handleInputTyped={props.handleEmailTyped} placeholder="EMAIL" />
          <DropDown items={['oi', 'eae', 'tchau']} />
          <Button style={{ marginTop: '40px', width: '100%' }} onClick={props.handleSubmitEmail}>
            CONTINUE
          </Button>
        </div>
      </div>
    </div>
  );
};

const { func } = PropTypes;

SignUpPerformer.propTypes = {
  handleEmailTyped: func.isRequired,
  handleSubmitEmail: func.isRequired,
  handleGoBackButtonClick: func.isRequired,
};

export default SignUpPerformer;
