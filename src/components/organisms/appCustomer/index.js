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
  // DATA VARIABLES
  const MUSIC_GENRES = useRef(GENRES.map((item) => ({ value: item, name: item })));
  const CATEGORIES = useRef(PERFORMERS_CATEGORIES);
  const ITALY_CITIES = useRef(ITALIAN_CITIES.map((item) => ({ value: item, name: item })));
  // other
  const NotLoadingOrSuccessOrError = !props.loading && !props.success && !props.error;
  const isDesktopMode = window.innerWidth > 500 ? true : false;
  return (
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
      <Header />
      <CustomModal
        title={'Filters'}
        open={openFilter}
        buttonText={'APPLY'}
        handleClose={() => {
          setOpenFilter(false);
        }}
      >
        <Autocomplete
          options={CATEGORIES.current}
          handleOptionSelected={props.handleCategorySelected}
          label={'CATEGORY'}
          value={props.categoryValue}
          style={{ maxWidth: 'inherit' }}
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
              />
            </div>
          ))}
        </div>
      </div>
      <AppBar
        selectedPage={'home'}
        handleHomeSelected={() => console.log('click')}
        handleProfileSelected={() => console.log('click')}
      />
    </div>
  );
};

const { func, any, bool } = PropTypes;

AppCustomer.propTypes = {
  nameValue: any.isRequired,
};

export default AppCustomer;
