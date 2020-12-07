import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/loginButton';
import GoBackHeader from '../../molecules/goBackHeader';

const WhoAreYou = (props) => {
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
          <text style={{ fontSize: 'xx-large', fontWeight: 'bold', marginBottom: '20px' }}>WHO ARE YOU?</text>
          <Button style={{ marginTop: '20px', width: '100%' }} onClick={props.handlePerformerSelected}>
            A PERFORMER
          </Button>
          <Button style={{ marginTop: '20px', width: '100%' }} onClick={props.handleCustomerSelected}>
            A CUSTOMER
          </Button>
        </div>
      </div>
    </div>
  );
};

const { func } = PropTypes;

WhoAreYou.propTypes = {
  handleCustomerSelected: func.isRequired,
  handlePerformerSelected: func.isRequired,
  handleGoBackButtonClick: func.isRequired,
};

export default WhoAreYou;
