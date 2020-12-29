import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '../atoms/closeIcon';
import { Colors } from '../../config';
import MicIcon from '../atoms/micIcon';
import Button from '../atoms/loginButton';
import { Dialog } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const Modal = (props) => {
  const StyledDialog = withStyles((theme) => ({
    container: {
      // backgroundColor: Colors.SECONDARY,
      // height: '100%',
    },
    paper: {
      width: '100%',
      height: 'auto',
      margin: 10,
      borderRadius: 30,
      backgroundColor: Colors.SECONDARY,
      padding: '20px 0vh',
      color: 'white',
    },
  }))(Dialog);
  return (
    <StyledDialog open={props.open} onClose={props.handleClose}>
      <CloseIcon
        style={{
          height: '5vh',
          margin: '20px',
          cursor: 'pointer',
          position: 'absolute',
          right: 0,
          top: 0,
          maxHeight: '35px',
        }}
        onClick={props.handleClose}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
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
          }}
        >
          <text style={{ fontSize: 'x-large', fontWeight: 'bold', color: Colors.INPUT_BACKGROUND }}>{props.title}</text>
          <div style={{ padding: '20px 0px', width: '100%' }}>{props.children}</div>
          <Button style={{ marginTop: 10 }} onClick={props.handleClose}>
            {props.buttonText}
          </Button>
        </div>
      </div>
    </StyledDialog>
  );
};

const { func, string, bool } = PropTypes;

Modal.propTypes = {
  title: string.isRequired,
  open: bool.isRequired,
  buttonText: string.isRequired,
  handleClose: func.isRequired,
};

export default Modal;
