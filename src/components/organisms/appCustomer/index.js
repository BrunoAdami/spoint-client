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
import { Performers, OFFERS } from '../../../mock-data';
import PerformerCard from '../../molecules/performerCard';
import CustomModal from '../../molecules/customModal';
import TuneIcon from '@material-ui/icons/Tune';
import Autocomplete from '../../atoms/autocomplete';
import { CATEGORIES as PERFORMERS_CATEGORIES } from '../../../config';
import GENRES from '../../../genres.json';
import { ITALIAN_CITIES } from '../../../istat-cities.json';
import { findAllByDisplayValue } from '@testing-library/react';
import OfferCard from '../../molecules/offerCard';
import Api from '../../../services/api';

const AppCustomer = (props) => {
  // STATE VARIABLES
  const [step, setStep] = useState(0);
  const [page, setPage] = useState('home'); // pages are "home" or "offers" or "profile"
  const [loading, setLoading] = useState(false);
  // for search page
  const [openFilter, setOpenFilter] = useState(false);
  const [openSendOffer, setOpenSendOffer] = useState(false);
  const [performerSelected, setPerformerSelected] = useState({
    id: null,
    email: null,
    name: '',
    category: null,
    genre: null,
    cost_per_hour: null,
    profile_pic_url: null,
  });
  const [performers, setPerformers] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // filters
  const [cityFilter, setCityFilter] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [genreFilter, setGenreFilter] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  let cityFilterValue = null;
  let categoryFilterValue = null;
  let genreFilterValue = null;
  let minPriceValue = null;
  let maxPriceValue = null;

  // offer info
  const [jobTitle, setJobTitle] = useState(null);
  const [jobStartTime, setJobStartTime] = useState(null);
  const [jobEndTime, setJobEndTime] = useState(null);
  const [jobAddress, setJobAddress] = useState(null);
  let jobTitleValue = null;
  let jobStartTimeValue = null;
  let jobEndTimeValue = null;
  let jobAddressValue = null;

  // offers
  const [jobOffers, setJobOffers] = useState([
    {
      title: null,
      start_time: null,
      end_time: null,
      date: null,
      address: null,
      performerName: null,
      performerPicUrl: null,
      status: null,
    },
  ]);

  //modals
  const [openSuccessOffer, setOpenSuccessOffer] = useState(false);
  // DATA VARIABLES
  const MUSIC_GENRES = useRef(GENRES.map((item) => ({ value: item, name: item })));
  const CATEGORIES = useRef(PERFORMERS_CATEGORIES);
  const ITALY_CITIES = useRef(ITALIAN_CITIES.map((item) => ({ value: item, name: item })));
  // other variables
  const NotLoadingOrSuccessOrError = !props.loading && !props.success && !props.error;
  const isDesktopMode = window.innerWidth > 500 ? true : false;

  // METHODS

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

  const getPerformers = async () => {
    const filter = {};
    // setCityFilter(cityFilterValue);
    // setCategoryFilter(categoryFilterValue);
    // setGenreFilter(genreFilterValue);
    // setMinPrice(minPriceValue);
    // setMaxPrice(maxPriceValue);
    if (cityFilterValue) filter['city'] = cityFilterValue;
    if (categoryFilterValue) filter['category'] = categoryFilterValue;
    if (genreFilterValue) filter['genre'] = genreFilterValue;
    if (minPriceValue) filter['cost_minimum'] = Number(minPriceValue);
    if (maxPriceValue) filter['cost_max'] = Number(maxPriceValue);
    console.log(filter);
    setLoading(true);
    Api.post('/search/', filter)
      .then((response) => {
        const { performers } = response.data;
        console.log(performers);
        setPerformers(performers);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleSendOffer = () => {
    const startDateArray = jobStartTimeValue ? jobStartTimeValue.split('T')[0].split('-') : null;
    const startHour = jobStartTimeValue ? jobStartTimeValue.split('T')[1] : null;
    const startTime = jobStartTimeValue
      ? `${startDateArray[0]}-${startDateArray[1]}-${startDateArray[2]},${startHour}`
      : null;
    const endDateArray = jobEndTimeValue ? jobEndTimeValue.split('T')[0].split('-') : null;
    const endHour = jobEndTimeValue ? jobEndTimeValue.split('T')[1] : null;
    const endTime = jobEndTimeValue ? `${endDateArray[0]}-${endDateArray[1]}-${endDateArray[2]},${endHour}` : null;
    const offerData = {
      email: props.email,
      password: props.password,
      performer_id: performerSelected.id,
      customer_id: props.id,
      title: jobTitleValue,
      start_time: startTime,
      end_time: endTime,
      address: jobAddressValue,
      price_per_hour: performerSelected.cost_per_hour,
    };
    console.log(offerData);

    setLoading(true);
    Api.post('/job/', offerData)
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        setOpenSuccessOffer(true);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    setOpenSendOffer(false);
  };

  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <Header />
      <AppBar
        selectedPage={page}
        handleHomeSelected={() => setPage('home')}
        handleProfileSelected={() => setPage('profile')}
        handleOffersSelected={() => setPage('offers')}
      />

      {/* ############## HOME ############## */}

      {/* successOffer */}
      {openSuccessOffer && (
        <Modal
          title={'OFFER SENT!'}
          subTitle={'Your offer was sent successfully'}
          handleCloseButton={() => setOpenSuccessOffer(false)}
        />
      )}

      {/* <<<<<<<<<<<<<< FILTER PERFORMERS >>>>>>>>>>>>>> */}

      {performers && page === 'home' && !loading && (
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
              getPerformers();
            }}
          >
            <Autocomplete
              id="city-filter-selector"
              options={ITALY_CITIES.current}
              handleOptionSelected={(event, newValue) => {
                cityFilterValue = newValue.value;
              }}
              label={'CITY'}
              style={{ marginTop: 20, maxWidth: 'inherit' }}
            />
            <Autocomplete
              id="category-filter-selector"
              options={CATEGORIES.current}
              handleOptionSelected={(event, newValue) => {
                categoryFilterValue = newValue.value;
              }}
              label={'CATEGORY'}
              style={{ marginTop: 20, maxWidth: 'inherit' }}
            />
            {/* {((props.categoryValue && props.categoryValue.value === 'Singer') ||
          (props.categoryValue && props.categoryValue.value === 'Band')) && ( */}
            <Autocomplete
              id="genre-filter-selector"
              options={MUSIC_GENRES.current}
              handleOptionSelected={(event, newValue) => {
                genreFilterValue = newValue.value;
              }}
              label={'GENRE'}
              style={{ marginTop: 20, maxWidth: 'inherit' }}
            />
            {/* )} */}
            <Input
              style={{ marginTop: 20, maxWidth: 'inherit' }}
              handleInputTyped={(event) => {
                minPriceValue = event.target.value;
              }}
              placeholder={'Minimum Price €'}
              type="number"
            />
            <Input
              style={{ marginTop: 20, maxWidth: 'inherit' }}
              handleInputTyped={(event) => {
                maxPriceValue = event.target.value;
              }}
              placeholder={'Maximum Price €'}
              type="number"
            />
          </CustomModal>

          {/* SEND OFFER MODAL */}

          <CustomModal
            title={'Send Job Offer'}
            open={openSendOffer}
            buttonText={`SEND TO ${performerSelected.name.split(' ')[0]}`}
            handleClose={handleSendOffer}
            basicClose={() => setOpenSendOffer(false)}
          >
            <div style={{ textAlign: 'center', fontSize: 'larger', fontWeight: 'bold' }}>{performerSelected.name}</div>
            <Input
              style={{ marginTop: 20, maxWidth: 'inherit' }}
              handleInputTyped={(event) => {
                jobTitleValue = event.target.value;
              }}
              placeholder={`Title`}
            />
            <Input
              style={{ marginTop: 20, maxWidth: 'inherit' }}
              handleInputTyped={(event) => {
                jobAddressValue = event.target.value;
              }}
              placeholder={`Address`}
            />
            <Input
              style={{ marginTop: 20, maxWidth: 'inherit' }}
              handleInputTyped={(event) => {
                jobStartTimeValue = event.target.value;
              }}
              placeholder={'Starts at'}
              type="datetime-local"
            />
            <Input
              style={{ marginTop: 20, maxWidth: 'inherit' }}
              handleInputTyped={(event) => {
                jobEndTimeValue = event.target.value;
              }}
              placeholder={'Ends at'}
              type="datetime-local"
            />
          </CustomModal>

          {/* SEARCH RESULT PAGE */}

          <div
            style={{
              padding: '20px 0',
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
                padding: '20px 0',
                width: '100vw',
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: 'large' }}>PERFORMERS FOUND</div>
              <Button style={{ width: isDesktopMode ? '10vw' : '21vw' }} onClick={() => setOpenFilter(true)}>
                <TuneIcon />
              </Button>
            </div>
            {performers.length === 0 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '62vh',
                  fontStyle: 'italic',
                }}
              >
                No performers found
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap' }}>
              {performers.map((performer) => (
                <div style={{ margin: 20 }}>
                  <PerformerCard
                    name={performer.name.split(' ')[0]}
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

      {!performers && page === 'home' && !loading && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <div style={{ fontSize: 'xx-large', marginBottom: 20 }}>FIND YOUR PERFORMER</div>
          <Autocomplete
            options={ITALY_CITIES.current}
            handleOptionSelected={(event, newValue) => {
              cityFilterValue = newValue.value;
            }}
            label={'CITY'}
            style={{ marginBottom: 40 }}
          />
          <Button style={{ marginBottom: '10vh' }} onClick={() => getPerformers()}>
            GO!
          </Button>
        </div>
      )}

      {/* ############## OFFERS ############## */}

      {page === 'offers' && !loading && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: 'auto',
            alignItems: 'center',
            backgroundColor: Colors.SECONDARY,
            width: '100%',
          }}
        >
          <div
            style={{
              padding: '20px 0',
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
                padding: '20px 0',
                width: '100vw',
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: 'large' }}>JOB OFFERS</div>
              <Button
                style={{ width: isDesktopMode ? '10vw' : '21vw' }}
                onClick={async () => {
                  setLoading(true);
                  await props.updateJobs();
                  setTimeout(() => setLoading(false), 2000);
                }}
              >
                UPDATE
              </Button>
            </div>
            {props.jobs.length === 0 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '62vh',
                  fontStyle: 'italic',
                }}
              >
                You've made no offers yet
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap' }}>
              {props.jobs.map((offer) => (
                <div style={{ margin: 20 }}>
                  <OfferCard
                    title={offer.title}
                    startTime={offer.start_time}
                    endTime={offer.end_time}
                    id={offer.id}
                    status={offer.status}
                    customerName={offer.customer_name}
                    performerName={offer.performer_name}
                    address={offer.address}
                    customerEmail={offer.customer_email}
                    performerEmail={offer.performer_email}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ############## PROFILE ############## */}

      {page === 'profile' && !loading && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={props.profile_pic_url}
              alt="Customer profile"
              style={{ height: '18vh', borderRadius: '50%', width: '18vh', objectFit: 'cover' }}
            />
            <text style={{ margin: '2vh', fontWeight: 900, fontSize: 'xx-large' }}>{props.name}</text>
            <text style={{ marginBottom: '0.5vh', fontSize: 'large' }}>
              Score: <strong>{props.score}</strong>
            </text>
            <text style={{ marginBottom: '0.5vh', fontSize: 'large' }}>
              Address: <strong>{props.address}</strong>
            </text>
            <text style={{ marginBottom: '0.5vh', fontSize: 'large' }}>
              Fiscal code: <strong>{props.fiscal_code}</strong>
            </text>
            <Button
              onClick={props.handleLogout}
              style={{
                color: 'white',
                background: `linear-gradient(45deg, rgb(93 32 78) 30%, rgb(162 79 143) 90%)`,
                marginTop: '12vh',
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      )}

      {/* <<<<<<<<<<<<<<<< LOADING SCREEN >>>>>>>>>>>>>>>>> */}

      {loading && (
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
  id: any.isRequired,
  email: any.isRequired,
  password: any.isRequired,
  name: any.isRequired,
  profile_pic_url: any.isRequired,
  score: any.isRequired,
  address: any.isRequired,
  fiscal_code: any.isRequired,
  jobs: any.isRequired,
};

export default AppCustomer;
