import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Colors } from '../../config';
import PropTypes from 'prop-types';

const desktopMode = window.innerWidth > 500;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: desktopMode ? '20vw' : '80vw',
    backgroundColor: Colors.INPUT_BACKGROUND,
    color: Colors.SECONDARY,
    cursor: 'pointer',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  cover: {
    width: desktopMode ? '8vw' : '30vw',
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    color: 'white',
  },
}));

const PerformerCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={props.handleCardClick}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <div style={{ fontSize: 'larger', fontWeight: 'bold' }}>{props.title}</div>
          <div
            style={{ color: '#414046', fontSize: 'medium', fontWeight: 'bold' }}
          >{`Start time: ${props.startTime}`}</div>
          <div
            style={{ color: '#414046', fontSize: 'medium', fontWeight: 'bold' }}
          >{`Duration: ${props.duration}`}</div>
        </CardContent>
        {!props.isPerformer && (
          <div
            className={classes.price}
            style={{
              backgroundColor:
                props.status === 'accepted'
                  ? '#32a852'
                  : props.status === 'waiting'
                  ? '#a86d32'
                  : props.status === 'rejected'
                  ? '#a83a32'
                  : '#a83a32',
            }}
          >
            <div style={{ fontSize: 'x-large' }}>{props.status}</div>
          </div>
        )}
        {props.isPerformer && (
          <div
            className={classes.price}
            style={{
              backgroundColor: Colors.PRIMARY,
            }}
          >
            <div style={{ fontSize: 'x-large' }}>{`${props.offerValue} €`}</div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PerformerCard;

const { string, number, func, any, bool } = PropTypes;

PerformerCard.propTypes = {
  title: string.isRequired,
  startTime: any.isRequired,
  duration: any.isRequired,
  status: any,
  isPerformer: bool,
  offerValue: number,
};

PerformerCard.defaultProps = {
  isPerformer: false,
  offerValue: null,
  status: null,
};
