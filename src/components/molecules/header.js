import React from 'react';
import { Colors } from '../../config';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import Logo from '../atoms/logo';

const Header = (props) => {
  return (
    <div
      style={{
        width: '100%',
        height: '8vh',
        //backgroundColor: Colors.PRIMARY,
        position: 'fixed',
        top: 0,
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.SECONDARY,
      }}
    >
      <Logo style={{ height: '6vh', padding: '1vh' }} />
    </div>
  );
};

export default Header;

const { string, func } = PropTypes;

Header.propTypes = {};
