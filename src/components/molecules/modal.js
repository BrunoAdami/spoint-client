import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '../atoms/closeIcon';
import { Colors } from '../../config';
import MicIcon from '../atoms/micIcon';

const Modal = (props) => {
  return (
    <div
      style={{
        height: '100%',
        zIndex: 1,
        position: 'absolute',
        top: 0,
        width: '100%',
        backgroundColor: Colors.SECONDARY,
      }}
    >
      <CloseIcon
        style={{ height: '5vh', margin: '20px', cursor: 'pointer', position: 'absolute', right: 0, top: 0 }}
        onClick={props.handleCloseButton}
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
          <text style={{ fontSize: 'xxx-large', fontWeight: 'bold', color: Colors.INPUT_BACKGROUND }}>
            {props.title}
          </text>
          <text style={{ fontSize: 'xx-large', fontWeight: 'bold', color: Colors.PRIMARY, marginTop: 20 }}>
            {props.subTitle}
          </text>
          <MicIcon style={{ height: '8vh', marginTop: 20 }} />
        </div>
      </div>
    </div>
  );
};

const { func, string } = PropTypes;

Modal.propTypes = {
  title: string.isRequired,
  subTitle: string.isRequired,
  handleCloseButton: func.isRequired,
};

export default Modal;
