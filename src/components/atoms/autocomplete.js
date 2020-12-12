import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Select } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { Colors } from '../../config';
import Input from './input';

const StyledTextField = withStyles((theme) => ({
  root: {
    backgroundColor: Colors.INPUT_BACKGROUND,
    borderRadius: 3,
    '& label.Mui-focused': {
      color: Colors.PRIMARY,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: Colors.SECONDARY,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: Colors.PRIMARY,
      },
      '&:hover fieldset': {
        borderColor: Colors.INPUT_BACKGROUND,
      },
      '&.Mui-focused fieldset': {
        borderColor: Colors.SECONDARY,
      },
    },
  },
}))(TextField);

const SpointAutocomplete = (props) => {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={props.options}
      getOptionLabel={(option) => option.name}
      style={{ width: '100%', maxWidth: 400, color: 'white important!' }}
      onChange={props.handleOptionSelected}
      value={props.value}
      renderInput={(params) => (
        <StyledTextField {...params} placeholder={props.label} variant="outlined" size="medium" fullWidth />
      )}
    />
  );
};

const { func, string, array } = PropTypes;

SpointAutocomplete.propTypes = {
  handleOptionSelected: func.isRequired,
  value: string.isRequired,
  options: array.isRequired,
  label: string.isRequired,
};

export default SpointAutocomplete;
