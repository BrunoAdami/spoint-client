import React from 'react';
import { Colors } from '../../config';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';

const desktopMode = window.innerWidth > 500;

const AppBar = (props) => {
  return (
    <div
      style={{
        width: '100%',
        height: '10vh',
        //backgroundColor: Colors.PRIMARY,
        position: 'fixed',
        bottom: 0,
        zIndex: 1,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: Colors.SECONDARY,
      }}
    >
      <IconButton onClick={props.handleHomeSelected}>
        <HomeIcon
          style={{ color: props.selectedPage === 'home' ? Colors.PRIMARY : Colors.INPUT_BACKGROUND }}
          fontSize="large"
        />
      </IconButton>
      <IconButton onClick={props.handleProfileSelected}>
        <PersonIcon
          style={{ color: props.selectedPage === 'profile' ? Colors.PRIMARY : Colors.INPUT_BACKGROUND }}
          fontSize="large"
        />
      </IconButton>
    </div>
  );
};

export default AppBar;

const { string, func } = PropTypes;

AppBar.propTypes = {
  selectedPage: string.isRequired,
  handleHomeSelected: func.isRequired,
  handleProfileSelected: func.isRequired,
};
