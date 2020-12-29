import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/loginButton';
import GoBackHeader from '../../molecules/goBackHeader';
import Input from '../../atoms/input';
import ProfilePicIcon from '../../atoms/profilePicIcon';
import Loader from '../../atoms/loader';
import Modal from '../../molecules/modal';
import Header from '../../molecules/header';
import AppBar from '../../molecules/appBar';
import { Colors } from '../../../config';
import { Performers } from '../../../mock-data';
import PerformerCard from '../../molecules/performerCard';
import CustomModal from '../../molecules/customModal';
import TuneIcon from '@material-ui/icons/Tune';
import Autocomplete from '../../atoms/autocomplete';
import { CATEGORIES as PERFORMERS_CATEGORIES } from '../../../config';
import GENRES from '../../../genres.json';
import { ITALIAN_CITIES } from '../../../istat-cities.json';

const AppCustomer = (props) => {
  // STATE VARIABLES
  const [step, setStep] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);
  const [openSendOffer, setOpenSendOffer] = useState(false);
  const [performerSelected, setPerformerSelected] = useState({
    email: null,
    name: '',
    category: null,
    genre: null,
    cost_per_hour: null,
    profile_pic_url: null,
  });
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  // DATA VARIABLES
  const MUSIC_GENRES = useRef(GENRES.map((item) => ({ value: item, name: item })));
  const CATEGORIES = useRef(PERFORMERS_CATEGORIES);
  const ITALY_CITIES = useRef(ITALIAN_CITIES.map((item) => ({ value: item, name: item })));
  // other variables
  const NotLoadingOrSuccessOrError = !props.loading && !props.success && !props.error;
  const isDesktopMode = window.innerWidth > 500 ? true : false;
  // methods
  const handleUpdateDate = (event) => {
    const { value } = event.target;
    const date = value.split('T')[0].split('-');
    const year = date[0];
    const month = date[1];
    const day = date[2];
    const time = value.split('T')[1].split(':');
    const hours = time[0];
    const minutes = time[1];
    console.log(year, month, '-', day, '-', hours, '-', minutes);
    setStartTime(new Date(year, month, day, hours, minutes));
    console.log(startTime);
  };
  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <Header />
      <AppBar
        selectedPage={'home'}
        handleHomeSelected={() => console.log('click')}
        handleProfileSelected={() => console.log('click')}
      />

      {/* <<<<<<<<<<<<<< FILTER PERFORMERS >>>>>>>>>>>>>> */}

      {true && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: 'auto',
            alignItems: 'center',
            backgroundColor: Colors.SECONDARY,
          }}
        >
          {/* FILTERS MODAL */}

          <CustomModal
            title={'Filters'}
            open={openFilter}
            buttonText={'APPLY'}
            handleClose={() => {
              setOpenFilter(false);
            }}
          >
            <Autocomplete
              options={ITALY_CITIES.current}
              handleOptionSelected={props.handleSearchCitySelected}
              label={'CITY'}
              value={props.searchCityValue}
              style={{ marginTop: 20, maxWidth: 'inherit' }}
            />
            <Autocomplete
              options={CATEGORIES.current}
              handleOptionSelected={props.handleCategorySelected}
              label={'CATEGORY'}
              value={props.categoryValue}
              style={{ marginTop: 20, maxWidth: 'inherit' }}
            />
            {/* {((props.categoryValue && props.categoryValue.value === 'Singer') ||
          (props.categoryValue && props.categoryValue.value === 'Band')) && ( */}
            <Autocomplete
              options={MUSIC_GENRES.current}
              handleOptionSelected={props.handleGenreSelected}
              label={'GENRE'}
              value={props.genreValue}
              style={{ marginTop: 20, maxWidth: 'inherit' }}
            />
            {/* )} */}
            <Input
              style={{ marginTop: 20, maxWidth: 'inherit' }}
              handleInputTyped={() => console.log('type')}
              placeholder={'Minimum Price €'}
              type="number"
            />
            <Input
              style={{ marginTop: 20, maxWidth: 'inherit' }}
              handleInputTyped={() => console.log('type')}
              placeholder={'Maximum Price €'}
              type="number"
            />
          </CustomModal>

          {/* SEND OFFER MODAL */}

          <CustomModal
            title={'Send Job Offer'}
            open={openSendOffer}
            buttonText={`SEND TO ${performerSelected.name.split(' ')[0]}`}
            handleClose={() => {
              setOpenSendOffer(false);
            }}
          >
            <div style={{ textAlign: 'center', fontSize: 'larger', fontWeight: 'bold' }}>{performerSelected.name}</div>
            <Input
              style={{ marginTop: 20, maxWidth: 'inherit' }}
              handleInputTyped={(event) => handleUpdateDate(event)}
              placeholder={'Starts at'}
              type="datetime-local"
            />
            <Input
              style={{ marginTop: 20, maxWidth: 'inherit' }}
              handleInputTyped={() => console.log('type')}
              placeholder={'Ends at'}
              type="datatime-local"
            />
            <Input
              style={{ marginTop: 20, maxWidth: 'inherit' }}
              handleInputTyped={() => console.log('type')}
              placeholder={`Address`}
            />
            <Input
              style={{ marginTop: 20, maxWidth: 'inherit' }}
              handleInputTyped={() => console.log('type')}
              placeholder={`Address`}
            />
            <div style={{ textAlign: 'center', fontSize: 'larger', fontWeight: 'bold' }}>{performerSelected.name}</div>
          </CustomModal>

          {/* SEARCH RESULT PAGE */}

          <div
            style={{
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: '8vh',
              paddingBottom: '10vh',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                padding: '20px',
                width: '100%',
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: 'large' }}>PERFORMERS FOUND</div>
              <Button style={{ width: isDesktopMode ? '10vw' : '21vw' }} onClick={() => setOpenFilter(true)}>
                <TuneIcon />
              </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap' }}>
              {Performers.map((performer) => (
                <div style={{ margin: 20 }}>
                  <PerformerCard
                    name={performer.name}
                    category={performer.category}
                    genre={performer.genre}
                    price_per_hour={performer.cost_per_hour}
                    profile_pic_url={performer.profile_pic_url}
                    handleCardClick={() => {
                      setPerformerSelected(performer);
                      setOpenSendOffer(true);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* <<<<<<<<<<<<<< SEARCH FOR PERFORMER >>>>>>>>>>>>>> */}

      {false && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            paddingTop: '8vh',
            paddingBottom: '10vh',
          }}
        >
          <div style={{ fontSize: 'xx-large', marginBottom: 20 }}>FIND YOUR PERFORMER</div>
          <Autocomplete
            options={ITALY_CITIES.current}
            handleOptionSelected={props.handleSearchCitySelected}
            label={'CITY'}
            value={props.searchCityValue}
            style={{ marginBottom: 40 }}
          />
          <Button style={{ marginBottom: '10vh' }} onClick={() => console.log('SUBMIT SEARCH')}>
            GO!
          </Button>
        </div>
      )}

      {/* <<<<<<<<<<<<<<<< LOADING SCREEN >>>>>>>>>>>>>>>>> */}

      {false && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
          }}
        >
          <Loader style={{ height: '48px', margin: '20px' }} />
          <text style={{ fontSize: 'xx-large', fontWeight: 'bold', marginBottom: '8vh' }}>{'LOADING...'}</text>
        </div>
      )}
    </div>
  );
};

const { func, any, bool } = PropTypes;

AppCustomer.propTypes = {
  nameValue: any.isRequired,
};

export default AppCustomer;
