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
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState({
    id: null,
    title: null,
    startTime: null,
    endTime: null,
    address: null,
    status: null,
    price_per_hour: null,
    customerName: null,
    performerName: null,
  });
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
                justifyContent: 'space-evenly',
                alignItems: 'center',
                padding: '20px',
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
                You've received no offers yet
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
                    customerName={offer.customerName}
                    performerName={offer.performerName}
                    address={offer.address}
                    isPerformer
                    offerValue={offer.price_per_hour}
                    handleCardClick={() => {
                      setSelectedOffer(offer);
                      console.log(selectedOffer);
                      setOpenOfferModal(true);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ############## RESPOND TO OFFER ############## */}

      <CustomModal
        title={'Do you want that job?'}
        open={openOfferModal}
        buttonText={'ACCEPT'}
        buttonText2={'REJECT'}
        isAcceptOfferCustomModal
        handleClose={() => {
          console.log('accept Job');
          props.jobs.find((offer) => offer.id === selectedOffer.id).status = 'accepted';
          setOpenOfferModal(false);
          // 5 send accepted status to back-end
        }}
        handleClose2={() => {
          console.log('reject job');
          props.jobs.find((offer) => offer.id === selectedOffer.id).status = 'rejected';
          setOpenOfferModal(false);
          //  6 SEND REJECTED STATUS TO BACK-END
        }}
      ></CustomModal>

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

AppPerformer.propTypes = {
  id: any.isRequired,
  email: any.isRequired,
  password: any.isRequired,
  name: any.isRequired,
  category: any.isRequired,
  genre: any.isRequired,
  cost_per_hour: any.isRequired,
  profile_pic_url: any.isRequired,
  birthday: any.isRequired,
  score: any.isRequired,
  search_city: any.isRequired,
  address: any.isRequired,
  fiscal_code: any.isRequired,
  money: any.isRequired,
  jobs: any.isRequired,
};

export default AppPerformer;
