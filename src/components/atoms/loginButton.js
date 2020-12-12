import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Colors } from '../../config';

const SpointButton = (props) => {
  const useStyles = makeStyles({
    root: {
      background: props.disabled ? 'grey' : `linear-gradient(45deg, ${Colors.PRIMARY} 30%, ${Colors.PURPLE} 90%)`,
      border: 0,
      borderRadius: 30,
      color: Colors.SECONDARY,
      fontSize: 'medium',
      fontWeight: 'bold',
      height: 48,
      width: '80vw',
      maxWidth: '400px',
      padding: '0 30px',
    },
  });
  const classes = useStyles();
  return (
    <Button {...props} className={classes.root}>
      {props.children}
    </Button>
  );
};

export default SpointButton;
