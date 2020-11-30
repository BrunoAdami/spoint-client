import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, InputBase } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Colors } from '../../config';

const StyledInput = withStyles((theme) => ({
  root: {
    backgroundColor: Colors.INPUT_BACKGROUND,
    borderRadius: 30,
    padding: 15,
    height: 48,
    maxWidth: '400px',
  },
}))(InputBase);

const Input = (props) => {
  return <StyledInput {...props} fullWidth placeholder={props.placeholder} onChange={props.handleInputTyped} />;
};

const { func, string } = PropTypes;

Input.propTypes = {
  handleInputTyped: func.isRequired,
  placeholder: string.isRequired,
};

export default Input;
