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
    height: desktopMode ? '17vh' : '25vh',
    cursor: 'pointer',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: desktopMode ? '12vw' : '50vw',
  },
  content: {
    flex: '1 0 auto',
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
    backgroundColor: Colors.PRIMARY,
    color: 'white',
  },
}));

const PerformerCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={props.handleCardClick}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <div style={{ fontSize: 'small', fontWeight: 'bold' }}>{props.name}</div>
          <div style={{ color: '#414046', fontSize: 'x-small', fontWeight: 'bold' }}>{props.category}</div>
          {props.genre && (
            <div style={{ color: '#414046', fontSize: 'x-small', fontStyle: 'italic' }}>{props.genre}</div>
          )}
        </CardContent>
        <div className={classes.price}>
          <div style={{ fontSize: 'medium' }}>{props.price_per_hour} €/h</div>
        </div>
      </div>
      <CardMedia className={classes.cover} image={props.profile_pic_url} title="Live from space album cover" />
    </Card>
  );
};

export default PerformerCard;

const { string, number, func } = PropTypes;

PerformerCard.propTypes = {
  name: string.isRequired,
  category: string.isRequired,
  genre: string,
  price_per_hour: number.isRequired,
  profile_pic_url: string.isRequired,
  handleCardClick: func.isRequired,
};
