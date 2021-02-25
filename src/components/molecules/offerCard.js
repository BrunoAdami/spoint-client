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
          <div style={{ fontSize: 'larger', fontWeight: 'bold', textAlign: 'start' }}>{props.title}</div>
          <div
            style={{ color: '#414046', fontSize: 'medium', fontWeight: 'bold', textAlign: 'start' }}
          >{`Start time: ${props.startTime}`}</div>
          <div
            style={{ color: '#414046', fontSize: 'medium', fontWeight: 'bold', textAlign: 'start' }}
          >{`End time: ${props.endTime}`}</div>
          <div
            style={{ color: '#414046', fontSize: 'medium', fontWeight: 'bold', textAlign: 'start' }}
          >{`Adress: ${props.address}`}</div>
          <div style={{ color: '#414046', fontSize: 'medium', fontWeight: 'bold', textAlign: 'start' }}>
            {props.isPerformer ? `Customer: ${props.customerName}` : `Performer: ${props.performerName}`}
          </div>
        </CardContent>
        {!props.isPerformer && (
          <div
            className={classes.price}
            style={{
              backgroundColor:
                props.status === 'accepted'
                  ? '#32a852'
                  : props.status === 'pending'
                  ? '#a86d32'
                  : props.status === 'rejected'
                  ? '#a83a32'
                  : '#a83a32',
            }}
          >
            <div style={{ fontSize: 'x-large' }}>{props.status}</div>
          </div>
        )}
        {props.isPerformer && (props.status === 'accepted' || props.status === 'rejected') && (
          <div
            className={classes.price}
            style={{
              backgroundColor:
                props.status === 'accepted'
                  ? '#32a852'
                  : props.status === 'pending'
                  ? '#a86d32'
                  : props.status === 'rejected'
                  ? '#a83a32'
                  : '#a83a32',
            }}
          >
            <div style={{ fontSize: 'x-large' }}>{props.status}</div>
          </div>
        )}
        {props.isPerformer && props.status !== 'accepted' && props.status !== 'rejected' && (
          <div
            className={classes.price}
            style={{
              backgroundColor: Colors.PRIMARY,
            }}
          >
            <div style={{ fontSize: 'x-large' }}>{`${props.offerValue} €/h`}</div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PerformerCard;

const { string, number, func, any, bool } = PropTypes;

PerformerCard.propTypes = {
  status: any,
  isPerformer: bool,
  offerValue: number,
};

PerformerCard.defaultProps = {
  isPerformer: false,
  offerValue: null,
  status: null,
};
