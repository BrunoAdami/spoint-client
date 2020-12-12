import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Select, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Colors } from '../../config';
import Input from '../atoms/input';

const StyledSelect = withStyles((theme) => ({
  root: {
    color: Colors.SECONDARY,
  },
}))(Select);

const DropDown = (props) => {
  return (
    <StyledSelect
      {...props}
      fullWidth
      onChange={props.handleSelect}
      variant="outlined"
      input={<Input />}
      value={props.value}
    >
      {props.items.map((item) => (
        <MenuItem value={item}>{item}</MenuItem>
      ))}
    </StyledSelect>
  );
};

const { func, string, array } = PropTypes;

DropDown.propTypes = {
  handleSelect: func.isRequired,
  value: string.isRequired,
  items: array.isRequired,
};

export default DropDown;
