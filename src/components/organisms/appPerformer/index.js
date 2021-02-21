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

const AppPerformer = (props) => {
  // STATE VARIABLES
  const [step, setStep] = useState(0);
  const [page, setPage] = useState('offers'); // pages are "offers" or "profile"
  const [loading, setLoading] = useState(false);
  // for profile page
  const [performerInfo, setPerformerInfo] = useState({
    name: '',
    category: '',
    genre: '',
    cost_per_hour: null,
    profile_pic_url: null,
    birthday: '',
    score: null,
    search_city: '',
    address: '',
    fiscalCode: null,
    money: null,
  });
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
  // DATA VARIABLES
  const ITALY_CITIES = useRef(ITALIAN_CITIES.map((item) => ({ value: item, name: item })));
  // other variables
  const NotLoadingOrSuccessOrError = !props.loading && !props.success && !props.error;
  const isDesktopMode = window.innerWidth > 500 ? true : false;

  // METHODS

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
        isPerformer={true}
      />

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
          }}
        >
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
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                width: '100%',
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: 'large' }}>JOB OFFERS</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap' }}>
              {OFFERS.map((offer) => (
                <div style={{ margin: 20 }}>
                  <OfferCard {...offer} isPerformer offerValue={200} />
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
              src="https://miro.medium.com/max/1838/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
              alt="Customer profile"
              style={{ height: '18vh', borderRadius: '50%', width: '18vh', objectFit: 'cover' }}
            />
            <text style={{ margin: '2vh', fontWeight: 900, fontSize: 'xx-large' }}>Yoda</text>
            <text style={{ marginBottom: '0.5vh', fontSize: 'large' }}>
              Score: <strong>3.5 stars</strong>
            </text>
            <text style={{ marginBottom: '0.5vh', fontSize: 'large' }}>
              Address: <strong>Street XXXX XXXX</strong>
            </text>
            <text style={{ marginBottom: '0.5vh', fontSize: 'large' }}>
              Fiscal code: <strong>XXXXXXXXX</strong>
            </text>
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

AppPerformer.propTypes = {
  nameValue: any.isRequired,
};

export default AppPerformer;
