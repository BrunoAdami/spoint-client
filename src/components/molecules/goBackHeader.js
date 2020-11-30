import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../atoms/logo';
import GoBackIcon from '../atoms/goBackIcon';

const GoBackHeader = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <GoBackIcon
        style={{ heigth: '5vh', margin: '20px', cursor: 'pointer' }}
        onClick={props.handleGoBackButtonClick}
      />
      <Logo style={{ height: '5vh', margin: '20px' }} />
    </div>
  );
};

const { func } = PropTypes;

GoBackHeader.propTypes = {
  handleGoBackButtonClick: func.isRequired,
};

export default GoBackHeader;
