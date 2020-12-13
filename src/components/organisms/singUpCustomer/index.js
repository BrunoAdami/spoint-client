import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/loginButton';
import GoBackHeader from '../../molecules/goBackHeader';
import Input from '../../atoms/input';
import ProfilePicIcon from '../../atoms/profilePicIcon';
import Loader from '../../atoms/loader';
import Modal from '../../molecules/modal';

const SignUpCustomer = (props) => {
  // STATE VARIABLES
  const [step, setStep] = useState(0);
  // other
  const NotLoadingOrSuccessOrError = !props.loading && !props.success && !props.error;
  return (
    <div style={{ height: '100%' }}>
      <GoBackHeader style={{ position: 'absolute', top: 0 }} handleGoBackButtonClick={props.handleGoBackButtonClick} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '90%',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            width: '75%',
            marginBottom: '100px',
          }}
        >
          {/* <<<<<<<<<<<<<<< FIRST STEP: NAME & PASSWORD >>>>>>>>>>>>>> */}
          {step === 0 && NotLoadingOrSuccessOrError && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <text style={{ fontSize: 'xx-large', fontWeight: 'bold', marginBottom: '20px' }}>
                {'NAME & PASSWORD'}
              </text>
              <Input
                value={props.nameValue}
                style={{ marginBottom: 20 }}
                handleInputTyped={props.handleNameTyped}
                placeholder="FULL NAME"
              />
              <Input
                value={props.passwordValue}
                type="password"
                handleInputTyped={props.handlePasswordTyped}
                placeholder="PASSWORD"
              />
              <Button
                style={{ marginTop: '40px', width: '100%' }}
                onClick={() => setStep(step + 1)}
                disabled={props.nameValue && props.passwordValue ? false : true}
              >
                CONTINUE
              </Button>
            </div>
          )}
          {/* <<<<<<<<<<<<<<< SECOND STEP: LOCATION & FINANCIAL>>>>>>>>>>>>>> */}
          {step === 1 && NotLoadingOrSuccessOrError && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <text style={{ fontSize: 'xx-large', fontWeight: 'bold', marginBottom: '20px' }}>
                {'LOCATION & FINANCIAL'}
              </text>
              <Input
                value={props.addressValue}
                style={{ marginBottom: 20 }}
                handleInputTyped={props.handleAdressTyped}
                placeholder="YOUR ADDRESS"
              />
              <Input
                value={props.fiscalCodeValue}
                style={{ marginBottom: 20 }}
                handleInputTyped={props.handleFiscalCodeTyped}
                placeholder="FISCAL CODE"
              />
              <div style={{ display: 'flex', width: '100%', maxWidth: 400 }}>
                {step > 0 && (
                  <Button
                    style={{ marginTop: '40px', width: '100%', marginRight: 20 }}
                    onClick={() => setStep(step - 1)}
                  >
                    GO BACK
                  </Button>
                )}
                <Button
                  style={{ marginTop: '40px', width: '100%' }}
                  onClick={() => setStep(step + 1)}
                  disabled={props.addressValue && props.fiscalCodeValue ? false : true}
                >
                  CONTINUE
                </Button>
              </div>
            </div>
          )}
          {/* <<<<<<<<<<<<<<< THIRD STEP: PROFILE PICTURE>>>>>>>>>>>>>> */}
          {step === 2 && NotLoadingOrSuccessOrError && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <text style={{ fontSize: 'xx-large', fontWeight: 'bold', marginBottom: '20px' }}>
                {'PROFILE PICTURE'}
              </text>
              {props.profilePicValue.url && !props.profilePicValue.uploading && (
                <img
                  alt="Profile"
                  style={{ height: '150px', borderRadius: '15px', marginBottom: '20px' }}
                  src={props.profilePicValue.url}
                />
              )}
              {!props.profilePicValue.url && !props.profilePicValue.uploading && (
                <ProfilePicIcon
                  style={{
                    height: '12vh',
                    maxHeight: '100px',
                    margin: '20px',
                  }}
                />
              )}
              {props.profilePicValue.uploading && <Loader style={{ height: '48px', margin: '20px' }} />}
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={props.handleUploadProfilePic}
              />
              <label htmlFor="raised-button-file">
                <Button onClick={props.handleRemoveProfilePic} component="span">
                  UPLOAD PICTURE
                </Button>
              </label>
              <div style={{ display: 'flex', width: '100%', maxWidth: 400 }}>
                {step > 0 && (
                  <Button
                    style={{ marginTop: '40px', width: '100%', marginRight: 20 }}
                    onClick={() => setStep(step - 1)}
                  >
                    GO BACK
                  </Button>
                )}
                <Button
                  style={{ marginTop: '40px', width: '100%' }}
                  onClick={props.handleSubmitCustomerInfo}
                  disabled={props.profilePicValue ? (props.profilePicValue.data ? false : true) : true}
                >
                  FINISH
                </Button>
              </div>
            </div>
          )}
          {/* <<<<<<<<<<<<<<< LOADING SCREEN >>>>>>>>>>>>>> */}
          {props.loading && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <Loader style={{ height: '48px', margin: '20px' }} />
              <text style={{ fontSize: 'xx-large', fontWeight: 'bold' }}>{'LOADING...'}</text>
            </div>
          )}
          {/* <<<<<<<<<<<<<<< SUCCESS SCREEN >>>>>>>>>>>>>> */}
          {props.success && (
            <Modal
              title="ALL INFORMATIONS HAVE BEEN VALIDATED"
              subTitle="WE WISH YOU A NICE EXPERIENCE ON SPOINT"
              handleCloseButton={props.handleCloseSuccessModal}
            />
          )}
          {/* <<<<<<<<<<<<<<< ERROR SCREEN >>>>>>>>>>>>>> */}
          {props.error && (
            <Modal title="AN ERROR OCURRED" subTitle="JUST TRY AGAIN" handleCloseButton={props.handleCloseErrorModal} />
          )}
        </div>
      </div>
    </div>
  );
};

const { func, any, bool } = PropTypes;

SignUpCustomer.propTypes = {
  nameValue: any.isRequired,
  passwordValue: any.isRequired,
  addressValue: any.isRequired,
  fiscalCodeValue: any.isRequired,
  birthdayValue: any.isRequired,
  profilePicValue: any.isRequired,
  handleGoBackButtonClick: func.isRequired,
  handleNameTyped: func.isRequired,
  handlePasswordTyped: func.isRequired,
  handleAdressTyped: func.isRequired,
  handleFiscalCodeTyped: func.isRequired,
  handleBirthdayTyped: func.isRequired,
  handleRemoveProfilePic: func.isRequired,
  handleUploadProfilePic: func.isRequired,
  handleCloseSuccessModal: func.isRequired,
  handleCloseErrorModal: func.isRequired,
  handleSubmitCustomerInfo: func.isRequired,
  loading: bool.isRequired,
  success: bool.isRequired,
  error: bool.isRequired,
};

export default SignUpCustomer;
